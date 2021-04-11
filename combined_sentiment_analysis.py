import re
from csv import reader

import flair
import praw
import requests


def make_prediction(model, reddit, twitter_bearer_key, company_name, ticker=""):
    """Give a recommendation for a specific stock using reddit and twitter data."""
    tweets = get_tweets(twitter_bearer_key, company_name, ticker)
    reddit_comments = get_reddit_comments(reddit, company_name, ticker)
    all_comments = tweets + reddit_comments

    probabilities, sentiments = calculate_sentiment(model, all_comments)
    return calculate_recommendation(probabilities, sentiments)


def get_tweets(bearer_key, company_name, ticker):
    """Collect relevant tweets."""
    company_name_response = get_twitter_request(company_name, bearer_key)

    tweets = list()

    for tweet in company_name_response.json()['statuses']:
        tweets.append(clean_comment(tweet['full_text']))

    if ticker != "":
        ticker_response = get_twitter_request(ticker, bearer_key)
        for tweet in ticker_response.json()['statuses']:
            tweets.append(clean_comment(tweet['full_text']))

    return tweets


def get_twitter_request(search_string, bearer_key):
    """Send a get request with search string to the Twitter API."""
    params = {
        'q': search_string,
        'tweet_mode': 'extended',
        'lang': 'en',
        'count': '1000',
        'result_type': "recent"
    }

    return requests.get(
        'https://api.twitter.com/1.1/search/tweets.json',
        params=params,
        headers={'authorization': 'Bearer ' + bearer_key}
    )


def clean_comment(comment):
    """Trim a comment of whitespace and web address."""
    whitespace = re.compile(r"\s+")
    web_address = re.compile(r"(?i)http(s):\/\/[a-z0-9.~_\-\/]+")
    comment = whitespace.sub(' ', comment)
    comment = web_address.sub('', comment)
    return comment


def get_reddit_comments(reddit, company_name, ticker):
    """Collect relevant reddit comments in r/wallstreetbets."""
    if ticker == "GME" or ticker.lower() == "gamestop":
        return get_reddit_gme_comments(reddit)

    reddit_comments = list()
    for submission in reddit.subreddit('wallstreetbets').search(query='flair:"Daily Discussion"', sort='new', limit=2):
        for i in range(0, 400):
            comment = clean_comment(submission.comments[i].body)
            if comment_is_relevant(comment, company_name, ticker):
                reddit_comments.append(comment)
    return reddit_comments


def get_reddit_gme_comments(reddit):
    """Collect relevant reddit comments from the daily GME Megathread."""
    reddit_comments = list()
    for submission in reddit.subreddit('wallstreetbets').search(query='GME Megathread', sort='new', limit=2):
        for i in range(0, 400):
            reddit_comments.append(clean_comment(submission.comments[i].body))
    return reddit_comments


def comment_is_relevant(comment, company_name, ticker):
    """Check if a comment contains the company name or ticker ignoring casing."""
    if len(ticker) == 0:
        return re.search(company_name, comment, re.IGNORECASE)
    else:
        return re.search(ticker, comment, re.IGNORECASE) or re.search(company_name, comment, re.IGNORECASE)


def calculate_sentiment(model, comments):
    """Calculate the sentiment and accuracy of each tweet or reddit comment."""
    probabilities = list()
    sentiments = list()

    for comment in comments:
        sentence = flair.data.Sentence(comment)
        model.predict(sentence)
        probabilities.append(sentence.labels[0].score)
        sentiments.append(sentence.labels[0].value)

    return probabilities, sentiments


def calculate_recommendation(probabilities, sentiments):
    """Calculate a recommendation from a list of sentiments."""
    pos = 0.0
    neg = 0.0

    for i in range(len(probabilities)):
        if sentiments[i] == "POSITIVE":
            pos += probabilities[i]
        else:
            neg += probabilities[i]

    average_confidence = sum(probabilities) / len(probabilities)

    positivity_ratio = pos / neg
    if positivity_ratio >= 2:
        recommendation = "Strong Buy"
    elif positivity_ratio >= 1.3:
        recommendation = "Buy"
    elif positivity_ratio <= 0.5:
        recommendation = "Strong Sell"
    elif positivity_ratio <= 1 / 1.3:
        recommendation = "Sell"
    else:
        recommendation = "Hold"

    return recommendation, average_confidence, pos, neg


def main():
    # Get secret API keys (api_keys_file.csv)
    with open("api_keys_file.csv", 'r') as read_obj:
        csv_reader = reader(read_obj)
        list_of_rows = list(csv_reader)

    twitter_bearer_key = list_of_rows[2][1]
    reddit_client_id = list_of_rows[3][1]
    reddit_client_secret = list_of_rows[4][1]
    reddit_user_agent = list_of_rows[5][1]

    # Trained sentiment analysis classifier
    model = flair.models.TextClassifier.load('en-sentiment')

    # Authorized Reddit API Wrapper
    reddit = praw.Reddit(client_id=reddit_client_id, client_secret=reddit_client_secret,
                         user_agent=reddit_user_agent)

    print(make_prediction(model, reddit, twitter_bearer_key, "moderna", "mrna"))


if __name__ == "__main__":
    main()

import praw
import flair
import pandas as pd
import re


# for submission in reddit.subreddit('wallstreetbets').top(limit=1000):
#     if submission.link_flair_text == 'Daily Discussion':
#         print(submission.title)
#         print(submission.link_flair_text)


def clean_comment(comment):
    whitespace = re.compile(r"\s+")
    web_address = re.compile(r"(?i)http(s):\/\/[a-z0-9.~_\-\/]+")
    comment = whitespace.sub(' ', comment)
    comment = web_address.sub('', comment)
    return comment


def predict_sentiments(reddit, model, ticker):
    probabilities = []  # confidence of prediction
    sentiments = []  # POSITIVE/NEGATIVE

    for submission in reddit.subreddit('wallstreetbets').search(query='flair:"Daily Discussion"', sort='new', limit=2):
        # print(submission.title)
        # print(submission.link_flair_text)
        # TODO: Make this a constant or argument
        for i in range(0, 400):
            comment = clean_comment(submission.comments[i].body)
            # TODO: Turn this boolean expression into a function
            if comment.find(ticker) != -1:
                sentence = flair.data.Sentence(comment)
                model.predict(sentence)
                # print(sentence)

                probabilities.append(sentence.labels[0].score)
                sentiments.append(sentence.labels[0].value)

    # TODO: Use explicit construction of dataframe
    df = pd.DataFrame()
    df['probability'] = probabilities
    df['sentiment'] = sentiments
    return df


def calculate_recommendation(df):
    pos = 0.0
    neg = 0.0
    probabilities = df['probability']

    for i in range(len(df['sentiment'])):
        if df['sentiment'][i] == "POSITIVE":
            pos += probabilities[i]
        else:
            neg += probabilities[i]

    average_confidence = sum(probabilities) / len(probabilities)

    positivity_ratio = pos / neg
    if positivity_ratio >= 2:
        # TODO: Turn these into an enum
        recommendation = "Strong Buy"
    elif positivity_ratio >= 1.5:
        recommendation = "Buy"
    elif positivity_ratio <= 0.5:
        recommendation = "Strong Sell"
    elif positivity_ratio <= 2.0 / 3:
        recommendation = "Sell"
    else:
        recommendation = "Hold"

    return recommendation, average_confidence, pos, neg


def recommend(reddit, model, ticker):
    return calculate_recommendation(predict_sentiments(reddit, model, ticker))


def main():
    # TODO: Hide the key in a hidden file
    reddit = praw.Reddit(client_id='RgFYwRpBqsZ5vw', client_secret='1QLaOziV8n77kzEQSvCtEUghASLaRQ',
                         user_agent='HackIllinoisBot')
    sentiment_model = flair.models.TextClassifier.load('en-sentiment')
    print("TSLA", recommend(reddit, sentiment_model, 'TSLA'))


if __name__ == '__main__':
    main()
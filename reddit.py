import praw
import flair
import pandas as pd
import re

# client_id and client_secret make up the key; user_agent can be any arbitrary name
reddit = praw.Reddit(client_id='RgFYwRpBqsZ5vw', client_secret='1QLaOziV8n77kzEQSvCtEUghASLaRQ',
                     user_agent='HackIllinoisBot')

# without a specific reddit account username and password, we only have a read-only account which is all we need
# print(reddit.read_only)

# simple demonstration
# for submission in reddit.subreddit('wallstreetbets').top(limit=1000):
#     if submission.link_flair_text == 'Daily Discussion':
#         print(submission.title)
#         print(submission.link_flair_text)

sentiment_model = flair.models.TextClassifier.load('en-sentiment')

# for submission in reddit.subreddit('wallstreetbets').search(query='flair:"Daily Discussion"', sort='new', limit=2):
#     print(submission.title)
#     print(submission.link_flair_text)
#     comments = submission.comments
#     for i in range(0, 400):
#         if comments[i].body.find('TSLA') != -1:
#             sentence = flair.data.Sentence(comments[i].body)
#             sentiment_model.predict(sentence)
#             print(sentence.labels[0].score)
#             print(sentence.labels[0].value)

# for submission in reddit.subreddit('wallstreetbets').search(query='GME Megathread', sort='new', limit=2):
#     print(submission.title)

df = pd.DataFrame()

# PART 2: PREPROCESSING
# we're using RegEx library re to remove whitespace,

# preprocessing to remove whitespace, addresses
whitespace = re.compile(r"\s+")
web_address = re.compile(r"(?i)http(s):\/\/[a-z0-9.~_\-\/]+")

# PART 3: SENTIMENT ANALYSIS
probabilities = []  # confidence of prediction
sentiments = []  # POSITIVE/NEGATIVE

for submission in reddit.subreddit('wallstreetbets').search(query='flair:"Daily Discussion"', sort='new', limit=2):
    print(submission.title)
    print(submission.link_flair_text)
    comments = submission.comments
    for i in range(0, 400):
        if comments[i].body.find('TSLA') != -1:
            comment = comments[i].body
            comment = whitespace.sub(' ', comment)
            comment = web_address.sub('', comment)

            sentence = flair.data.Sentence(comments[i].body)

            sentiment_model.predict(sentence)
            print(sentence)

            probabilities.append(sentence.labels[0].score)
            sentiments.append(sentence.labels[0].value)

df['probability'] = probabilities
df['sentiment'] = sentiments

# ------------------------------------------------------------------------------#

# PART 4: RECOMMENDATION

pos = 0.0
neg = 0.0

# we want each sentiment to affect the final recommendation
# by its confidence so adjust on a scale from 0-1 as per confidence
for i in range(len(sentiments)):
    if sentiments[i] == "POSITIVE":
        pos += probabilities[i]

    if sentiments[i] == "NEGATIVE":
        neg += probabilities[i]

average_confidence = sum(probabilities) / len(probabilities)

positivity_ratio = pos / neg

if positivity_ratio >= 2:
    print("Strong Buy")
elif positivity_ratio >= 1.5:
    print("Buy")
elif positivity_ratio <= 0.5:
    print("Strong Sell")
elif positivity_ratio <= 2.0 / 3:
    print("Sell")
else:
    print("Hold")

print(average_confidence, pos, neg)

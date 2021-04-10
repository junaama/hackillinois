import praw

# client_id and client_secret make up the key; user_agent can be any arbitrary name
reddit = praw.Reddit(client_id='RgFYwRpBqsZ5vw', client_secret='1QLaOziV8n77kzEQSvCtEUghASLaRQ',
                     user_agent='HackIllinoisBot')

# without a specific reddit account username and password, we only have a read-only account which is all we need
# print(reddit.read_only)

# simple demonstration
for submission in reddit.subreddit('wallstreetbets').hot(limit=10):
    print(submission.title)

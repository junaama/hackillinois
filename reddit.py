import praw

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

for submission in reddit.subreddit('wallstreetbets').search('flair:"Daily Discussion"', sort='new', limit=2):
    print(submission.title)
    print(submission.link_flair_text)

for submission in reddit.subreddit('wallstreetbets').search(query='GME Megathread', sort='new', limit=2):
    print(submission.title)

# url = 'https://www.reddit.com/r/wallstreetbets/comments/mnf6e4/gme_megathread_for_april_09_2021/'
# submission = reddit.submission(url=url)
#
# for top_level_comment in submission.comments:
#     print(top_level_comment)

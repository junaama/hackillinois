import twitter
import requests
import pandas as pd
import flair

print("hello world")

params = {
    'q': 'tesla',
    'tweet_mode': 'extended',
    'lang': 'en',
    'count': '100'
}

response = requests.get(
    'https://api.twitter.com/1.1/search/tweets.json',
    params=params,
    headers={'authorization': 'Bearer '+ "AAAAAAAAAAAAAAAAAAAAAGvSOQEAAAAAeMnU6cOK5qNAaUl4g3jIltH0nNw%3DZTvb9om1pZAkDkZmmvI2ZxldPQiTSyMg8ulk5jH1d9rONo4N2o"}
)

def get_data(tweet):
    data = {
        'id': tweet['id_str'],
        'created_at': tweet['created_at'],
        'text': tweet['full_text']
    }
    return data


df = pd.DataFrame()
for tweet in response.json()['statuses']:
    row = get_data(tweet)
    df = df.append(row, ignore_index=True)

sentiment_model = flair.models.TextClassifier.load('en-sentiment')

sentence = flair.data.Sentence("Gamestop is going to the moon!")
sentiment_model.predict(sentence)
print(sentence)
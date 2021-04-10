#twitter and requests for data scraping
import twitter
import requests
#pd for holding the requested tweets
import pandas as pd
#flair for sentiment analysis model
import flair
#re for regex preprocessing
import re

#------------------------------------------------------------------------------#

#PART 1: GETTING TWITTER DATA

#functions to use
def getData(tweet):
    data = {
        'id': tweet['id_str'],
        'created_at': tweet['created_at'],
        'text': tweet['full_text']
    }
    return data


#make a request for tweets mentioning "tesla"
params = {
    'q': 'tesla', 
    'tweet_mode': 'extended',
    'lang': 'en',
    'count': '1000'
}

response1 = requests.get(
    'https://api.twitter.com/1.1/search/tweets.json',
    params=params,
    headers={'authorization': 'Bearer '+ "AAAAAAAAAAAAAAAAAAAAAGvSOQEAAAAAeMnU6cOK5qNAaUl4g3jIltH0nNw%3DZTvb9om1pZAkDkZmmvI2ZxldPQiTSyMg8ulk5jH1d9rONo4N2o"}
)

#make a request for tweets mentioning "tsla"
params = {
    'q': 'tsla',
    'tweet_mode': 'extended',
    'lang': 'en',
    'count': '1000'
}
response2 = requests.get(
    'https://api.twitter.com/1.1/search/tweets.json',
    params=params,
    headers={'authorization': 'Bearer '+ "AAAAAAAAAAAAAAAAAAAAAGvSOQEAAAAAeMnU6cOK5qNAaUl4g3jIltH0nNw%3DZTvb9om1pZAkDkZmmvI2ZxldPQiTSyMg8ulk5jH1d9rONo4N2o"}
)

#adds response1 and response2 tweets to the dataframe (df)
df = pd.DataFrame()
for tweet in response1.json()['statuses']:
    row = getData(tweet)
    df = df.append(row, ignore_index=True)

for tweet in response2.json()['statuses']:
    row = getData(tweet)
    df = df.append(row, ignore_index=True)

#tweets now holds all of our relavant tweets
tweets = df

#------------------------------------------------------------------------------#

#PART 2: PREPROCESSING
#we're using RegEx library re to remove whitespace, 

# preprocessing to remove whitespace, addresses
whitespace = re.compile(r"\s+")
web_address = re.compile(r"(?i)http(s):\/\/[a-z0-9.~_\-\/]+")


#------------------------------------------------------------------------------#

#PART 3: SENTIMENT ANALYSIS

myModel = flair.models.TextClassifier.load('en-sentiment')

probabilities = []  #confidence of prediction 
sentiments = []     #POSITIVE/NEGATIVE

for tweet in tweets['text'].to_list():
    #preprocess tweet
    tweet = whitespace.sub(' ', tweet)
    tweet = web_address.sub('', tweet)

    #predict the pos/neg
    sentence = flair.data.Sentence(tweet)
    myModel.predict(sentence)
    
    #add prediction values
    probabilities.append(sentence.labels[0].score)  
    sentiments.append(sentence.labels[0].value) 

# add probability and sentiment predictions to tweets dataframe
tweets['probability'] = probabilities
tweets['sentiment'] = sentiments


#------------------------------------------------------------------------------#

#PART 4: RECOMMENDATION

pos = 0
neg = 0

# we want each sentiment to affect the final recommendation by its confidence so adjust on a scale from 0-1 as per confidence
for i in range(len(sentiments)):
    if (sentiments[i] == "POSITIVE"):
        pos = pos + (1 * probabilities[i])
        
    if (sentiments[i] == "NEGATIVE"):
        neg = neg + (1 * probabilities[i])
        
average_confidence = (sum(probabilities))/len(probabilities)

# if we have a highly positive/highly negative prediction, we want to recommend an action
# otherwise hold
ratio1 = pos/neg
ratio2 = neg/pos

#for the middle range (for lukewarm buy/sell/no action recommend Hold)
if (ratio1 > ratio2):
    if (ratio1 >= 3):
        print("Strong Buy")
    elif (ratio1 >= 2):
        print("Buy")
    else:
        print("Hold")

else:
    if (ratio2 >= 3):
        print("Strong Sell")
    elif (ratio2 >= 2):
        print("Sell")
    else:
        print("Hold")

print(average_confidence, pos, neg)

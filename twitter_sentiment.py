#twitter and requests for data scraping
#import twitter
import requests
#pd for holding the requested tweets
import pandas as pd
#flair for sentiment analysis model
import flair
#re for regex preprocessing
import re

from csv import reader
from os import environ as env


#functions to use
def getData(tweet):
    data = {
        'id': tweet['id_str'],
        'created_at': tweet['created_at'],
        'text': tweet['full_text']
    }
    return data

def makePrediction(model, bearer, name1, name2 = ""):
    #PART 1: GETTING TWITTER DATA
    params = {
        'q': name1, 
        'tweet_mode': 'extended',
        'lang': 'en',
        'count': '1000'
    }

    response1 = requests.get(
        'https://api.twitter.com/1.1/search/tweets.json',
        params=params,
        headers={'authorization': 'Bearer '+ bearer}
    )
    if (name2 != ""):
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

    if (name2 != ""):
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
    probabilities = []  #confidence of prediction 
    sentiments = []     #POSITIVE/NEGATIVE

    for tweet in tweets['text'].to_list():
        #preprocess tweet
        tweet = whitespace.sub(' ', tweet)
        tweet = web_address.sub('', tweet)

        #predict the pos/neg
        sentence = flair.data.Sentence(tweet)
        model.predict(sentence)
        
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
        if (ratio1 >= 2):
            print("Strong Buy")
        elif (ratio1 >= 1.5):
            print("Buy")
        else:
            print("Hold")

    else:
        if (ratio2 >= 2):
            print("Strong Sell")
        elif (ratio2 >= 1.5):
            print("Sell")
        else:
            print("Hold")

    print(average_confidence, pos, neg)

def main():
    myModel = flair.models.TextClassifier.load('en-sentiment')
    #get my secret API keys (api_keys_file.csv)
    with open("api_keys_file.csv", 'r') as read_obj:
        csv_reader = reader(read_obj)
        list_of_rows = list(csv_reader)

    bearer_keys = (list_of_rows[2])
    bearer_key = bearer_keys[1]
    makePrediction(myModel, bearer_key, "tesla", "tsla")
    makePrediction(myModel, bearer_key, "qualcomm")
    #make a request for tweets mentioning "tesla"
    


if __name__ == "__main__":
    main()
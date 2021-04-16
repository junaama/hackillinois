# HackIllinois Project

## About

This project was made for the HackIllinois hackathon. This is a responsive web application that let's you view predicted stock movements based on social media sentiment analysis (Twitter, Reddit). The purpose of this project is to provide investors/finance nerds an insight into what the public thinks...about publicly traded companies. The backend algorithm can also provide information about how potential IPOs can do, what people think about industries or trends as a whole.

## Files

[twitter_sentiment.py](twitter_sentiment.py) contains the script for finding the sentiment analysis of certain stocks based on twitter feeds.

[stockdata.py](stockdata.py) is a script that returns the current price of a given stock

[frontend](frontend) folder contains the react code for the web application. It uses CRA, TailwindCSS, and Firebase for the Cloud hosted NoSQL database

## Links
[Figma Wireframes](https://www.figma.com/file/g593eKhG8qcQcXocmuxBrw/HI-Wireframes) 
[Build](https://moonstock.netlify.app)

## Contributors

This project was made in part by Naama Paulemont, Aparna Ayyah, William OCampo, Jasmine Gutierrez, Jeffrey Sun, and Andy Zhou.

## Setup

```
# Create virtual environment 
# Activate your virtual environment
# Install all packages in the requirements.txt file
# Import environment variables (manually)
# Run application

cd stock-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=stock-api.py
flask run

```

```
cd frontend
npm install
cp .env.local.example .env.local
```
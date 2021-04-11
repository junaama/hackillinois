import yfinance as yf
from flask import Flask

def get_current_price(symbol):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='1d')
    return data['Close'][0]

print(get_current_price('TSLA'))

def get_price_week(symbol):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='7d', interval='1d')
    return data['Close']

print(get_price_week('TMUS'))
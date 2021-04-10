import yfinance as yf
from flask import Flask

def get_current_price(symbol):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='1d')
    return data['Close'][0]

print(get_current_price('TSLA'))

def get_daily_change(symbol):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='1d')
    return (data['Close'][0] - data['Open'][0]) / data['Open'][0]

print(get_daily_change('TSLA'))
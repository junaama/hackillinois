import yfinance as yf


def get_current_price(symbol):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='1d')
    return data['Close'][0]


def get_price_week(symbol):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='7d', interval='1d')
    return data['Close']

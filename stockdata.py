import yfinance as yf

def get_current_price(symbol):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='1d')
    return data['Close'][0]

print(get_current_price('TSLA'))
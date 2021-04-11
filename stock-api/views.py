from flask import Blueprint, jsonify
from .stockdata import get_price_week
import pandas as pd


class Dummy:

    def __init__(self, d, p):
       self.date = d
       self.price = p

    def dump(self):
        return {
            "date": self.date,
            "price": self.price
        }


main = Blueprint('main', __name__)


@main.route('/tickers/<ticker>', methods=['GET'])
def get_ticker(ticker):
    series = get_price_week(ticker)
    df = pd.DataFrame({'date': series.index, 'price': series.values})
    lst = []
    for index, row in df.iterrows():
        lst.append(Dummy(row.date, row.price).dump())
    print(lst)
    return jsonify(lst)

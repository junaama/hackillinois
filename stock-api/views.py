from flask import Blueprint, jsonify, request
from . import db, User
from .models import Stock
import stockdata

main = Blueprint('main', __name__)

@main.route('/add_stock', methods=['POST'])
def add_stock():
    stock_data = request.get_json()

    new_stock = Stock(ticker=stock_data['ticker'], price=stockdata.get_current_price(stock_data['ticker']))

    db.session.add(new_stock)
    db.session.commit()

    return 'Done', 201

@main.route('/update_stocks', methods=['POST']) 
def update_stocks():
    for stock in User.query.all():
        stock.price = stockdata.get_current_price(stock.ticker)

    db.session.commit()

@main.route('/stocks')
def stocks():
    stock_list = Stock.query.all()
    stocks = []

    for stock in stock_list:
        stocks.append({'ticker' : stock.ticker, 'price' : stock.price})

    return jsonify({'stocks' : stocks})
from . import db 

class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(50))
    price = db.Column(db.Integer)
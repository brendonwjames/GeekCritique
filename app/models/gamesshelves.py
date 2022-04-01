from app.models.db import db

gamesshelves = db.Table('gamesshelves',

db.Column('shelf_id',
db.Integer,
db.ForeignKey('shelves.id'),
primary_key=True),

db.Column('game_id',
db.Integer,
db.ForeignKey('games.id'),
primary_key=True)

)

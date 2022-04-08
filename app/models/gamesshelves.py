from .db import db

games_shelves = db.Table('games_shelves',

db.Column('shelf_id',
db.Integer,
db.ForeignKey('shelves.id'),
primary_key=True),

db.Column('game_id',
db.Integer,
db.ForeignKey('games.id'),
primary_key=True)

)
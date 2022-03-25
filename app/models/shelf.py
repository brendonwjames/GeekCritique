from .db import db

class Shelf(db.Model):
    __tablename__ = 'shelves'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    users = db.relationship('User', back_populates='shelves')
    games = db.relationship('Game', back_populates='shelves')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'game_id': self.game_id,
            'name': self.name,
        }

from .db import db
from app.models.gamesshelves import games_shelves

class Shelf(db.Model):
    __tablename__ = 'shelves'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    name = db.Column(db.String(100), nullable=False)

    games = db.relationship('Game', secondary='games_shelves', back_populates='shelves')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            # 'game_id': self.game_id,
            'name': self.name,
            'games': [game.to_dict() for game in self.games]
        }

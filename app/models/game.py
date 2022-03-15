from .db import db


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000))
    img_src = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='game')
    review = db.relationship('Review', back_populates='game', cascade='all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'img_src': self.img_src,
            'created_at': self.created_at
        }

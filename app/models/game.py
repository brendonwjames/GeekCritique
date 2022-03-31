from .db import db 

class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(65), nullable=False)
    description = db.Column(db.String(65))
    img_src = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime)

    users = db.relationship('User', back_populates='games')
    reviews = db.relationship('Review', back_populates='games', cascade='all,delete')
    shelves = db.relationship('Shelf', back_populates='games', cascade='all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'img_src': self.img_src,
            'created_at': self.created_at,
            # 'users': self.users.to_dict()
        }

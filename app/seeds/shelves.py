from app.models import db
from app.models.game import Game
from app.models.shelf import Shelf

def seed_shelves():
    demo = Shelf(
        owner_id=1, 
        name='DemoShelf',
    )

    game = Game.query.get(1)
    print(game, '***************************************')
    game.shelves.append(demo)
    db.session.add(demo)
    

    db.session.commit()

def undo_shelves():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

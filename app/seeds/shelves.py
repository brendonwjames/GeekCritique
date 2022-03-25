from app.models import db
from app.models.shelf import Shelf

def seed_shelves():
    demo = Shelf(
        owner_id=1, 
        game_id=1,
        name='In Progress',
    )
    mario = Shelf(
        owner_id=2, 
        game_id=1,
        name='In Progress',
    )
    chief = Shelf(
        owner_id=3, 
        game_id=1,
        name='Finished',
    )
    demo2 = Shelf(
        owner_id=1, 
        game_id=2,
        name='100% Complete',
    )
    demo3 = Shelf(
        owner_id=3, 
        game_id=3,
        name='Hate',
    )

    db.session.add(demo)
    db.session.add(mario)
    db.session.add(chief)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()

def undo_shelves():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

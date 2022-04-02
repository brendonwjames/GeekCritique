from app.models import db
from app.models.gamesshelves import games_shelves

def seed_gamesshelves():
    demo = gamesshelves(
        game_id = 1,
        shelf_id = 1
    )

    db.session.add(demo)

    db.session.commit()

def undo_gamesshelves():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

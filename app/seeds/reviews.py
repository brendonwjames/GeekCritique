from app.models import db
from app.models.review import Review

def seed_reviews():
    demo = Review(
        user_id=1, 
        game_id=1,
        content='This is my review for this game: It was very good.',
        rating=5
    )
    mario = Review(
        user_id=2, 
        game_id=1,
        content='Sooo goooooood',
        rating=5
    )
    chief = Review(
        user_id=3, 
        game_id=1,
        content='BOTW was just ok.',
        rating=2
    )
    demo2 = Review(
        user_id=1, 
        game_id=2,
        content='This is my review for this game.......',
        rating=4
    )
    demo3 = Review(
        user_id=3, 
        game_id=3,
        content='I have nothing more to say.',
        rating=3
    )

    db.session.add(demo)
    db.session.add(mario)
    db.session.add(chief)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

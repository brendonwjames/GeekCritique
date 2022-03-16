from app.models import db, Game
from datetime import datetime

def seed_games():
    demo = Game(
        owner_id=1,
        name='The Legend of Zelda: Breath of the Wild', 
        description='Arguable the greatest game of all time. Currently on my 3rd playthrough, 1st master mode run.', 
        img_src='https://www.zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg', 
        created_at=datetime.now()
    )
    mario = Game(
        owner_id=2,
        name='Super Mario World', 
        description='A Super Nintendo classic.', 
        img_src='https://images.nintendolife.com/games/snes/super_mario_world/cover_large.jpg', 
        created_at=datetime.now()
    )

    chief = Game(
        owner_id=3,
        name='Halo', 
        description='The game that truly put the Xbox on the map. Bloodgulch forever!!', 
        img_src='https://www.denofgeek.com/wp-content/uploads/2020/07/halo-infinite-box-art.png?w=805', 
        created_at=datetime.now()
    )

    db.session.add(demo)
    db.session.add(mario)
    db.session.add(chief)

    db.session.commit()

def undo_games():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

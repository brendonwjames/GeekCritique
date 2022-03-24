from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_img_src='https://cdn.vox-cdn.com/thumbor/336dycW89ahdzhYExES9eMNJF6U=/0x0:1920x1080/1400x933/filters:focal(519x173:825x479):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/70431347/link_botw.0.jpg')
    mario = User(
        username='Mario', email='marnie@aa.io', password='password', profile_img_src='https://media.wired.com/photos/5926c126af95806129f50868/master/w_2560%2Cc_limit/SuperMarioRunTA.jpg')
    chief = User(
        username='Chief', email='chief@aa.io', password='password', profile_img_src='https://cdn.mos.cms.futurecdn.net/j6reMf3QEuGWFE7FkVmoyT.jpg')
    bomberman = User(
        username='Bomberman', email='a@a.com', password='password', profile_img_src='https://styles.redditmedia.com/t5_2tk3f/styles/communityIcon_c9bkwed5d2d71.png?width=256&s=735ec5d10c8e07381888f99ff612646f5ebd2340')
    bumpkins = User(
        username='Bumpkins', email='bumpkins@b.com', password='password', profile_img_src='https://www.dkvine.com/games/gallery/albums/artwork/dk64/chunky_kong_03.png')
    auntydonna = User(
        username='AuntyDonna', email='auntydonna@aol.com', password='password', profile_img_src='https://pbs.twimg.com/media/EGrumWqXkAA2PD7.jpg')
    zeus = User(
        username='Zeus', email='marny@bob.com', password='password', profile_img_src='https://drawinghowtos.com/wp-content/uploads/2020/02/zeus-colored.jpg')

    db.session.add(demo)
    db.session.add(mario)
    db.session.add(chief)
    db.session.add(bomberman)
    db.session.add(bumpkins)
    db.session.add(auntydonna)
    db.session.add(zeus)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

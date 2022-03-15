from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Link', email='demo@aa.io', password='password', profile_img_src='https://static.wikia.nocookie.net/characterprofile/images/c/c8/BotW_Link.png/revision/latest?cb=20170306180639')
    mario = User(
        username='Mario', email='marnie@aa.io', password='password', profile_img_src='https://play-lh.googleusercontent.com/5LIMaa7WTNy34bzdFhBETa2MRj7mFJZWb8gCn_uyxQkUvFx_uOFCeQjcK16c6WpBA3E')
    chief = User(
        username='Chief', email='bobbie@aa.io', password='password', profile_img_src='https://cdn.mos.cms.futurecdn.net/j6reMf3QEuGWFE7FkVmoyT.jpg')

    db.session.add(demo)
    db.session.add(mario)
    db.session.add(chief)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

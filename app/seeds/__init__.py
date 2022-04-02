from flask.cli import AppGroup
from .users import seed_users, undo_users
from .games import seed_games, undo_games
from .reviews import seed_reviews, undo_reviews
from .shelves import seed_shelves, undo_shelves

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_games()
    seed_shelves()
    seed_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_games()
    undo_reviews()
    undo_shelves()
    # Add other undo functions here

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models.db import db
from app.models.game import Game
from app.models.user import User

games_routes = Blueprint('games', __name__)

@games_routes.route('')
def all_games():
    all_games = Game.query.all()
    print(all_games, '***********')

    return {'games': [game.to_dict() for game in all_games]}
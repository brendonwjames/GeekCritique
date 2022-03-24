from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models.game import Game

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/games')
# @login_required
def user_games(id):
    # print('hitting the backend')
    user_games = Game.query.filter(id == Game.owner_id).all()
    return {'usergames': [game.to_dict() for game in user_games]}
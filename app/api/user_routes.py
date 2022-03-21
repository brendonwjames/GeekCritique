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
    print('hitting the backend')
    user_games = Game.query.filter(id == Game.owner_id).all()
    return {'usergames': [game.to_dict() for game in user_games]}


    # posts = Post.query.filter(id==Post.user_id).order_by(Post.created_at.desc()).all()
    # # comments = Comment.query.filter(id==Comment.user_id).order_by(Comment.created_at.desc()).all()

    # # total = [post.to_dict() for post in posts] + [comment.to_dict() for comment in comments]
    # total = [post.to_dict() for post in posts]

    # # print(total, '============================')
    # # total.sort(key=lambda x: x['created_at'], reverse=True)
    # return {'total' : total}
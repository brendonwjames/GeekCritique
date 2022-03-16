from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models.db import db
from app.models.game import Game
from app.models.user import User

from app.forms.new_game_form import NewGameForm

games_routes = Blueprint('games', __name__)

@games_routes.route('')
def all_games():
    all_games = Game.query.all()
    # print('FROM GAMES_ROUTE:', all_games)

    return {'games': [game.to_dict() for game in all_games]}

@games_routes.route('/new_game', methods=['POST'])
@login_required
def create_game():
    form = NewGameForm()
    print('FORM:', form)

    if form.validate_on_submit():
        print('BACKEND FORMDATA:', form.data)

        new_game = Game(
            owner_id = current_user.id,
            name = name,
            description = description,
            img_src = img_src,
            created_at = created_at
        )

    db.session.add(new_game)
    db.session.commit()
    return new_game.to_dict()

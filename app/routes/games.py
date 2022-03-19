from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models.db import db
from app.models.game import Game
from app.models.user import User

from app.forms.new_game_form import NewGameForm

games_routes = Blueprint('games', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@games_routes.route('')
def all_games():
    all_games = Game.query.all()
    # print('FROM GAMES_ROUTE:', all_games)

    return {'games': [game.to_dict() for game in all_games]}

@games_routes.route('/<int:id>')
def one_game(id):
    game = Game.query.get(id)
    return game.to_dict()

@games_routes.route('/new_game', methods=['POST'])
@login_required
def create_game():
    form = NewGameForm()
    # print('HITTING THE BACKEND FORM:', (form))
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print('BACKEND FORMDATA:', form.data)

        new_game = Game(
            owner_id = current_user.id,
            name = form.data['name'],
            description = form.data['description'],
            img_src = form.data['img_src'],
            created_at = datetime.now()
        )
        db.session.add(new_game)
        db.session.commit()
        return new_game.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

   
@games_routes.route('/<int:id>/edit', methods=['POST'])
@login_required
def edit_game(id):
    form = NewGameForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():


        edit_game = Game.query.get(id)

        # edit_game.owner_id = current_user.id,
        edit_game.name = form.data['name'],
        edit_game.description = form.data['description'],
        edit_game.img_src = form.data['img_src']
        # edit_game.created_at = datetime.now()

        db.session.commit()
        return edit_game.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@games_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_game(id):
    game = Game.query.get(id)
    db.session.delete(game)
    db.session.commit()

    return game.to_dict()
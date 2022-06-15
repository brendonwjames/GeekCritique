from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

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
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('BACKEND FORMDATA:', form.data)

        if "img_src" not in request.files:

            return {"errors": "image required"}, 400

        img_src = request.files['img_src']

        if not allowed_file(img_src.filename):

            return {"errors": "file type not permitted"}, 400

        img_src.filename = get_unique_filename(img_src.filename)

        upload = upload_file_to_s3(img_src)

        if "url" not in upload:

            return upload, 400
        
        owner_id = current_user.id
        name = request.form['name']
        description = request.form['description']
        img_src = upload['url']

        new_game = Game(
            owner_id = owner_id,
            name = name,
            description = description,
            img_src = img_src,
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

        edit_game.name = form.data['name'],
        edit_game.description = form.data['description'],
        edit_game.img_src = form.data['img_src']

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
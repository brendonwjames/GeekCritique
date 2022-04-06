from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models.db import db
from app.models.game import Game
from app.models.user import User
from app.models.shelf import Shelf

from app.forms.shelf_form import ShelfForm

shelves_routes = Blueprint('shelves', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@shelves_routes.route('/<int:id>')
# @login_required
def get_shelves(id):
    user_shelves = Shelf.query.filter(id == Shelf.owner_id).all()
    return {'shelves': [shelf.to_dict() for shelf in user_shelves]}

@shelves_routes.route('/new_shelf', methods=['POST'])
@login_required
def create_shelf():
    form = ShelfForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_shelf = Shelf(
            owner_id = current_user.id,
            name = form.data['name']
        )

        db.session.add(new_shelf)
        db.session.commit()
        return new_shelf.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@shelves_routes.route('/add_to_shelf/<int:shelf_id>/games/<int:game_id>', methods=['POST'])
@login_required
def add_game_to_shelf(shelf_id, game_id):
    
    game_to_add = request.json
    game = Game.query.get(game_id)
    
    for data in game_to_add:
        shelf = Shelf.query.get(shelf_id)
        shelf.games.append(game)
    
    db.session.commit()
    return shelf.to_dict()

@shelves_routes.route('/remove_from_shelf/<int:shelf_id>/games/<int:game_id>', methods=['DELETE'])
@login_required
def remove_game_from_shelf(shelf_id, game_id):
    game_to_remove = request.json
    shelf = Shelf.query.get(shelf_id)

    for data in game_to_remove:
        game = Game.query.get(game_id)
        shelf.games.remove(game)

    db.session.commit()
    return shelf.to_dict()

@shelves_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_shelf(id):
    shelf = Shelf.query.get(id)
    db.session.delete(shelf)
    db.session.commit()

    return shelf.to_dict()

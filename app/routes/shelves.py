from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models.db import db
from app.models.game import Game
from app.models.user import User
from app.models.shelf import Shelf

from app.forms.review_form import ReviewForm

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

@shelves_routes.route('/')
def get_user_shelves():
    user_shelves = Shelf.query.all()
    return {'shelves': [shelf.to_dict() for shelf in user_shelves]}

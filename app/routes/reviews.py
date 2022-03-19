from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models.db import db
from app.models.game import Game
from app.models.user import User
from app.models.review import Review

from app.forms.review_form import ReviewForm

reviews_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@reviews_routes.route('/<int:game_id>')
def get_reviews(game_id):
    all_reviews = Review.query.filter(Review.game_id == game_id).all()
    all_users = User.query.all()
    return {'reviews': [review.to_dict() for review in all_reviews], 'users': [user.to_dict() for user in all_users]}
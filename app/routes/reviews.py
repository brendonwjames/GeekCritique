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

@reviews_routes.route('/new_review', methods=['POST'])
@login_required
def create_review():
    form = ReviewForm()
    # print('HITTING THE BACKEND FORM:', (form))
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print('BACKEND FORMDATA:', form.data)

        new_review = Review(
            user_id = current_user.id,
            game_id = form.data['game_id'],
            content = form.data['content'],
            rating = form.data['rating'],
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models.db import db
from app.models.game import Game
from app.models.user import User
from app.models.shelf import Shelf

from app.forms.review_form import ReviewForm

shelves_routes = Blueprint('shelves', __name__)
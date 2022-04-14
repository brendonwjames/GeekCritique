from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo, URL
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

 
def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def image_valid_jpg(form, field):
    image_url = field.data
    valid = re.search(r'\.(png|jpeg|jpg|gif)$', image_url.lower())
    if not valid:
        raise ValidationError("Valid image URL must end with .png, .jpeg, .jpg or .gif.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired('Username: Username is required!'), Length(max=40, message='Username can only have 40 characters max!'), username_exists])
    email = StringField('email', validators=[DataRequired('Email: Valid email is required!'), Email('Please enter a valid email format!'), Length(max=255, message='Email can only have 255 characters max!'), user_exists])
    password = StringField('password', validators=[DataRequired('Password: Password is required!'), EqualTo('confirm_password', message='Passwords must match'), Length(min=6, message="Passwords must be at least 6 characters long")])
    confirm_password = StringField('confirm_password', validators=[DataRequired('Confirm Password: Confirm Password is required!')])
    profile_img_src = StringField('profile_img_src', validators=[DataRequired('Profile Picture: A link to an image is required!'), Length(max=255, message='Profile Picture: URL too long! Choose a different link'), URL(require_tld=True, message='Profile Picture: The image URL provided is not valid! Choose a different link.'),
                           image_valid_jpg])
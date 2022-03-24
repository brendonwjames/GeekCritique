from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateTimeField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, URL
import re

def image_valid_jpg(form, field):
    image_url = field.data
    valid = re.search(r'\.(png|jpeg|jpg|gif)$', image_url.lower())
    if not valid:
        raise ValidationError("Valid image URL must end with .png, .jpeg, .jpg or .gif.")

class NewGameForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    name = StringField('name', validators=[DataRequired('Enter a title for your game!'), Length(max=100, message='Title must be less than 100 characters!')])
    description = TextAreaField('description', validators=[Length(max=100, message='Description must be less than 100 characters!')])
    img_src = StringField('img_src', validators=[DataRequired('A link to an image is required!'), Length(max=255, message='URL too long! Choose a different link'), URL(require_tld=True, message='The image URL provided is not valid! Choose a different link.'),
                           image_valid_jpg])
    created_at = DateTimeField('created_at')
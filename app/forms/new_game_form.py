from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateTimeField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class NewGameForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description')
    img_src = StringField('img_src', validators=[DataRequired()])
    created_at = DateTimeField('created_at')
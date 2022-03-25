from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length

class Shelf(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired('UserId error - unable to fetch UserId')])
    game_id = IntegerField('game_id', validators=[DataRequired('GameId error - unable to fetch GameId')])
    name = StringField('name', validators=[DataRequired('Enter a title for your game!'), Length(max=100, message='Title must be less than 100 characters!')])
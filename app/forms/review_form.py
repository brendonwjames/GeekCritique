from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired('UserId error - unable to fetch UserId')])
    game_id = IntegerField('game_id', validators=[DataRequired('GameId error - unable to fetch GameId')])
    content = TextAreaField('content', validators=[DataRequired('Reviews require a review!'), Length(max=254, message='Reviews must be 255 characters or less!')])
    rating = IntegerField('rating', validators=[DataRequired('Reviews require a rating!')])
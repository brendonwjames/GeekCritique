from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired('User id error')])
    game_id = IntegerField('game_id', validators=[DataRequired('game id error')])
    content = TextAreaField('content', validators=[DataRequired('Reviews require a review!')])
    rating = IntegerField('rating', validators=[DataRequired('Reviews require a rating!')])
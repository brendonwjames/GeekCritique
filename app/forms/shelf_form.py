from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length

# def shelfname_exists(form, field):
#     # Checking if shelfname is already in use
#     shelfname = field.data
#     shelf = Shelf.query.filter(Shelf.name == name).first()
#     if shelf:
#         raise ValidationError('Username is already in use.')

class ShelfForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    name = StringField('name', validators=[DataRequired('Enter a name for your shelf!'), Length(max=100, message='Name must be less than 100 characters!')])
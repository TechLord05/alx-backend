#!/usr/bin/python3

from flask import Flask, request, flash
from flask_babel import (Babel, format_datetime, format_number, format_decimal,
                         format_currency, format_percent, format_scientific, _)
from datetime import datetime

#initialize the flask app
app = Flask(__name__)
app.secret_key = 'myscretekeywhichyoucannotguess'

# Configure the app
app.config['BABEL_DEFAULT_LOCALE'] = 'en_US'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
app.config['LANGUAGES'] = ['en', 'es']

def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])
# Initialize Babelw= with the Flask app
babel = Babel(app, locale_selector=get_locale)

with app.test_request_context():
    formatted_date = format_datetime(datetime(1987, 3, 5, 17, 12), 'full')
    print(formatted_date)
    format_num = format_decimal(1.2346)
    print(format_num)
    currency = format_currency(1099.98, 'USD')
    print(currency)
    percent = format_percent(0.34)
    print(percent)
    scientific = format_scientific(10000)
    print(scientific)

@app.route('/', methods=["GET", "POST"])
def index():
    flash("Testing one, two, three")
    return "Hello world"

if __name__ == '__main__':
    app.run()
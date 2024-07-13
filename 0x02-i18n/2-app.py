#!/usr/bin/env python3

"""
Get locale from request
"""

from flask import Flask, render_template, request
from flask_babel import Babel


class Config(object):
    """
    Config class
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


# Flask app
app = Flask(__name__)
app.config.from_object(Config)

babel = Babel(app)

# Create a get_locale function with babel.localeselector decorator


@babel.localeselector
def get_locale() -> str:
    """
    Gets locale from request object
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', strict_slashes=False)
def index() -> str:
    """
   Render a basic html template
    """
    return render_template('2-index.html')


if __name__ == "__main__":
    app.run()

#!/usr/bin/env python3

"""
Basic Babel setup
"""

from flask import Flask, render_template
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

# Babel instance
babel = Babel(app)


@app.route('/', strict_slashes=False)
def index() -> str:
    """
   Render a basic html template
    """
    return render_template('1-index.html')


if __name__ == "__main__":
    app.run()

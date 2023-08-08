import flask
from flask import Flask, session, redirect
import os

def render_template(*args, **kwargs):
    return flask.render_template(*args, **kwargs, VERSION=SERVER_VERSION)

app = Flask(__name__)

SERVER_VERSION = "sss"


@app.route("/")
def index():
    return render_template("index.html")
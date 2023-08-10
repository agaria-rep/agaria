import flask
from flask import Flask, session, redirect
import os
import requests

def render_template(*args, **kwargs):
    return flask.render_template(*args, **kwargs, VERSION=SERVER_VERSION)

app = Flask(__name__)

SERVER_VERSION = os.environ.get("VERCEL_GIT_COMMIT_SHA")
if SERVER_VERSION == None: SERVER_VERSION = "SERVER"


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/time/")
def time():
    return render_template("time.html")

@app.route("/change/")
def change():
    response = requests.get("https://api.frankfurter.app/latest?from=BGN&to=EUR").json()
    
    os.environ.setdefault("date", response["date"])
    os.environ.setdefault("rate", response["rates"]["EUR"]+os.environ.get("rate"))
    return render_template("change.html", os.environ.get("rate"))

if SERVER_VERSION == "SERVER":
    app.run()
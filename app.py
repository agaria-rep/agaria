import flask
from flask import Flask, session, redirect
import os
import requests
import json

def render_template(*args, **kwargs):
    return flask.render_template(*args, **kwargs, VERSION=SERVER_VERSION)

app = Flask(__name__)

SERVER_VERSION = os.environ.get("VERCEL_GIT_COMMIT_SHA")
VK = os.environ.get("VK")

if SERVER_VERSION == None: 
    SERVER_VERSION = "SERVER"
    VK = json.loads(open("secret.json", "r").read())["vk"]


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/time/")
def time():
    return render_template("time.html")

@app.route("/change/")
def change():
    changes_ = requests.post("https://vamo.vccountries.repl.co/vamo/change").json()

    return render_template("change.html", changes=changes_, changes_dates=list(changes_.keys()))

if SERVER_VERSION == "SERVER":
    app.run()
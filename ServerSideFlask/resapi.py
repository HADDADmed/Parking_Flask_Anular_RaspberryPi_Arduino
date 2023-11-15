# import crypt

from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,get_jwt_identity)

import bcrypt

app = Flask(__name__)
CORS(app)

# import mysql.connector
# app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
# app.config["JWT_ALGORITHM"] = "HS256"
# jwt = JWTManager(app)

# mydb = mysql.connector.connect(
#     host="127.0.0.1",
#     port=3307,
#     user="root",
#     password="MySql123",
#     database="crudcar"
# )



# home route 

@app.route('/')
def home():
    return "Hello World"

    


# les web methods

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
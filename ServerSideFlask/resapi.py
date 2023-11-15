# import crypt

from flask import Flask , redirect, request  , jsonify
import json
import Vehicle as vehicle
import Subscription as subscription
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,get_jwt_identity)

import bcrypt

app = Flask(__name__)
CORS(app)

import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="",
    database="parking"
)

# home route 

@app.route('/')
def home():
    return "Hello World"
@app.route('/saveVehicule', methods=['POST'])
def saveVehicule():
    args = request.json 
    matrecule = args.get('matrecule')
    model = args.get('model')
    userId = args.get('userId')
    sub_id = args.get('abonnement_id')
    
    # Create an instance of the Vehicle class
    myVehicle = vehicle.Vehicle(0, matrecule, model, userId, sub_id, mydb)
    
    # Call the save method on the instance
    myVehicle.save()
    
    return jsonify({"message": "Vehicle saved successfully"})
# les web methods
@app.route('/deleteVehicle', methods=['POST'])
def deleteVehicle():
    args = request.json
    vehicle_id = args.get('vehicle_id')

    # Create an instance of the Vehicle class
    myVehicle = vehicle.Vehicle(vehicle_id, '', '', '', '', mydb)

    # Call the delete method on the instance
    myVehicle.delete()

    return jsonify({"message": "Vehicle deleted successfully"})
@app.route('/updateVehicle', methods=['POST'])
def updateVehicle():
    args = request.json
    vehicle_id = args.get('vehicle_id')
    new_matricule = args.get('new_matricule')
    new_model = args.get('new_model')

    # Create an instance of the Vehicle class
    myVehicle = vehicle.Vehicle(vehicle_id, '', '', '', '', mydb)

    # Call the update method on the instance
    myVehicle.update(new_matricule, new_model)

    return jsonify({"message": "Vehicle updated successfully"})
# Inside your Flask application
@app.route('/saveSubscription', methods=['POST'])
def saveSubscription():
    args = request.json
    subscription_type = args.get('subscription_type')
    description = args.get('description')

    # Create an instance of the Subscription class
    mySubscription = subscription.Subscription(0, subscription_type, description, mydb)

    # Call the save method on the instance
    mySubscription.save()

    return jsonify({"message": "Subscription saved successfully"})


@app.route('/deleteSubscription', methods=['POST'])
def deleteSubscription():
    args = request.json
    subscription_id = args.get('subscription_id')

    # Create an instance of the Subscription class
    mySubscription = subscription.Subscription(subscription_id, '', '', mydb)

    # Call the delete method on the instance
    mySubscription.delete()

    return jsonify({"message": "Subscription deleted successfully"})


@app.route('/updateSubscription', methods=['POST'])
def updateSubscription():
    args = request.json
    subscription_id = args.get('subscription_id')
    new_type = args.get('new_type')
    new_description = args.get('new_description')

    # Create an instance of the Subscription class
    mySubscription = subscription.Subscription(subscription_id, '', '', mydb)

    # Call the update method on the instance
    mySubscription.update(new_type, new_description)

    return jsonify({"message": "Subscription updated successfully"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
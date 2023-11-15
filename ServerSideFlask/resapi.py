# import crypt

from flask import Flask , redirect, request  , jsonify
import json
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy 
import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@127.0.0.1:3306/parking'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

mydb = SQLAlchemy(app)

# Model 
Status_Vehicule = mydb.Table('stat_vehic',
    mydb.Column('id_vehicule', mydb.Integer, mydb.ForeignKey('vehicle.id')),
    mydb.Column('id_status', mydb.Integer, mydb.ForeignKey('statuss.id'))
)

class Vehicle(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    matricule = mydb.Column(mydb.String(255))
    model = mydb.Column(mydb.String(255))
    user_id = mydb.Column(mydb.Integer, mydb.ForeignKey('user.id'))
    sub_id = mydb.Column(mydb.Integer, mydb.ForeignKey('subscription.id'))
    following = mydb.relationship('Statuss', secondary=Status_Vehicule, backref='vehicles')

class Statuss(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    type = mydb.Column(mydb.String(255))
    date = mydb.Column(mydb.DateTime)

class Subscription(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    type = mydb.Column(mydb.String(255))
    description = mydb.Column(mydb.String(255))
    vehicles = mydb.relationship('Vehicle', backref='subscription')

class User(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    name = mydb.Column(mydb.String(255))
    username = mydb.Column(mydb.String(255))
    password = mydb.Column(mydb.String(255))
    age = mydb.Column(mydb.Integer)
    vehicles = mydb.relationship('Vehicle', backref='user')


# API and Routes
# for Vehicle

@app.route('/saveVehicule', methods=['POST'])
def saveVehicule():
    args = request.json 
    matrecule = args.get('matrecule')
    model = args.get('model')
    userId = args.get('userId')
    sub_id = args.get('abonnement_id')

    myvecle = Vehicle(id= 0 , matricule=matrecule , model=model , user_id = userId , sub_id=sub_id)
    mydb.session.add(myvecle)
    mydb.session.commit()
    
    return jsonify({"message": "Vehicle saved successfully"})


@app.route('/deleteVehicle', methods=['DELETE'])
def deleteVehicle():
    args = request.json
    vehicle_id = args.get('vehicle_id')

    # Query the database to find the vehicle with the given ID
    myVehicle = Vehicle.query.get(vehicle_id)

    if myVehicle:
        # Delete the vehicle if it exists
        mydb.session.delete(myVehicle)
        mydb.session.commit()
        return jsonify({"message": "Vehicle deleted successfully"})
    else:
        return jsonify({"message": "Vehicle not found"})
    

@app.route('/updateVehicle', methods=['PUT'])
def updateVehicle():
    body = request.json
    vehicle_id = body.get('vehicle_id')
    new_matricule = body.get('new_matricule')
    new_model = body.get('new_model')

    # Query the database to find the vehicle with the given ID
    myVehicle = Vehicle.query.get(vehicle_id)

    if myVehicle:
        # Update the vehicle if it exists
        myVehicle.matricule = new_matricule
        myVehicle.model = new_model
        mydb.session.commit()
        return jsonify({"message": "Vehicle updated successfully"})
    else:
        return jsonify({"message": "Vehicle not found"})
    
# for Subscription 
    
@app.route('/saveSubscription', methods=['POST'])
def saveSubscription():
    args = request.json
    subscription_type = args.get('type')
    description = args.get('description')

    # Créez une instance de la classe Subscription
    newSubscription = Subscription(type=subscription_type, description=description)

    # Ajoutez la nouvelle souscription à la base de données
    mydb.session.add(newSubscription)
    mydb.session.commit()

    return jsonify({"message": "Subscription saved successfully", "id": newSubscription.id})

@app.route('/deleteSubscription', methods=['DELETE'])
def deleteSubscription():
    args = request.json
    subscription_id = args.get('subscription_id')

    # Query the database to find the subscription with the given ID
    mySubscription = Subscription.query.get(subscription_id)

    if mySubscription:
        # Delete the subscription if it exists
        mydb.session.delete(mySubscription)
        mydb.session.commit()
        return jsonify({"message": "Subscription deleted successfully"})
    else:
        return jsonify({"message": "Subscription not found"})

@app.route('/updateSubscription', methods=['PUT'])
def updateSubscription():
    args = request.json
    subscription_id = args.get('subscription_id')
    new_type = args.get('new_type')
    new_description = args.get('new_description')

    # Query the database to find the subscription with the given ID
    mySubscription = Subscription.query.get(subscription_id)

    if mySubscription:
        # Update the subscription if it exists
        mySubscription.type = new_type
        mySubscription.description = new_description
        mydb.session.commit()
        return jsonify({"message": "Subscription updated successfully"})
    else:
        return jsonify({"message": "Subscription not found"})
    
# for User 
@app.route('/saveUser', methods=['POST'])
def saveUser():
    args = request.json
    name = args.get('name')
    username = args.get('username')
    password = args.get('password')
    age = args.get('age')

    # Créez une instance de la classe User
    newUser = User(name=name, username=username, password=password, age=age)

    # Ajoutez le nouvel utilisateur à la base de données
    mydb.session.add(newUser)
    mydb.session.commit()

    return jsonify({"message": "User saved successfully", "id": newUser.id})

@app.route('/deleteUser', methods=['DELETE'])
def deleteUser():
    args = request.json
    user_id = args.get('user_id')

    # Query the database to find the user with the given ID
    myUser = User.query.get(user_id)

    if myUser:
        # Delete the user if it exists
        mydb.session.delete(myUser)
        mydb.session.commit()
        return jsonify({"message": "User deleted successfully"})
    else:
        return jsonify({"message": "User not found"})

@app.route('/updateUser', methods=['PUT'])
def updateUser():
    args = request.json
    user_id = args.get('user_id')
    new_name = args.get('new_name')
    new_username = args.get('new_username')
    new_password = args.get('new_password')
    new_age = args.get('new_age')

    # Query the database to find the user with the given ID
    myUser = User.query.get(user_id)

    if myUser:
        # Update the user if it exists
        myUser.name = new_name
        myUser.username = new_username
        myUser.password = new_password
        myUser.age = new_age
        mydb.session.commit()
        return jsonify({"message": "User updated successfully"})
    else:
        return jsonify({"message": "User not found"})

# Associate a status for a vehicle 

@app.route('/assignStatusToVehicle', methods=['GET'])
def assignStatusToVehicle():
    vehicle_id = request.args.get('vehicle_id')
    status_id = request.args.get('status_id')

    # Query the database to find the vehicle with the given ID
    myVehicle = Vehicle.query.get(vehicle_id)

    if myVehicle:
        # Query the database to find the status with the given ID
        myStatus = Statuss.query.get(status_id)

        if myStatus:
            # Assign the status to the vehicle with the current date
            myVehicle.following.append(myStatus)
            # myStatus.date = datetime.now()

            mydb.session.commit()
            return jsonify({"message": "Status assigned to the vehicle successfully"})
        else:
            return jsonify({"message": f"Status with ID {status_id} not found"})
    else:
        return jsonify({"message": f"Vehicle with ID {vehicle_id} not found"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
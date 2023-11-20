# import crypt

from hashlib import scrypt
from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@127.0.0.1:3306/parking'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

mydb = SQLAlchemy(app)

# Model 

class StatussVehicule(mydb.Model):
    __tablename__ = 'stat_vehic'
    id = mydb.Column(mydb.Integer, primary_key=True) 
    id_vehicule = mydb.Column('id_vehicule', mydb.Integer, mydb.ForeignKey('vehicle.id'), primary_key=True)
    id_status = mydb.Column('id_status', mydb.Integer, mydb.ForeignKey('statuss.id'), primary_key=True)
    date = mydb.Column('date', mydb.DateTime)
    vehicle = mydb.relationship('Vehicle', back_populates='status')
    status = mydb.relationship('Statuss', back_populates='vehicles')


class Vehicle(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    matricule = mydb.Column(mydb.String(255))
    model = mydb.Column(mydb.String(255))
    user_id = mydb.Column(mydb.Integer, mydb.ForeignKey('user.id'))
    status = mydb.relationship('StatussVehicule' , back_populates='vehicle')
    
    
class Statuss(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    type = mydb.Column(mydb.String(255))
    vehicles = mydb.relationship('StatussVehicule' ,back_populates='status')  # Correction ici


class Subscription(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    type = mydb.Column(mydb.String(255))
    description = mydb.Column(mydb.String(255))
    vehicles = mydb.relationship('SubscriptionVehicle', back_populates='subscription')

class SubscriptionVehicle(mydb.Model):
   __tablename__ = 'subc_vehic'
   id = mydb.Column(mydb.Integer, primary_key=True)
   id_vehicle = mydb.Column('id_vehicule', mydb.Integer, mydb.ForeignKey('vehicle.id'))
   id_subc = mydb.Column('id_subc', mydb.Integer, mydb.ForeignKey('subscription.id'))
   time =  mydb.Column('time', mydb.Time)
   subscription = mydb.relationship('Subscription', back_populates='vehicles')

class User(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    name = mydb.Column(mydb.String(255))
    username = mydb.Column(mydb.String(255))
    password = mydb.Column(mydb.String(255))
    age = mydb.Column(mydb.Integer)
    isAdmin = mydb.Column(mydb.Boolean)
    vehicles = mydb.relationship('Vehicle', backref='user')


@app.route('/')
def index():
    return "Hello World"


@app.route('/createDb', methods=['GET'])
def createDb():
    mydb.create_all()
    return jsonify({"message": "Database created successfully"})



# API and Routes
# for Vehicle

# login 
@app.route('/login', methods=['POST'])
def login():
    args = request.json
    username = args.get('username')
    password = args.get('password')
    print(username)
    print(password)
    return jsonify({"message": "login successfully"})



@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    vehicles = list(map(lambda vehicle: vehicle.serialize(), vehicles))
    return jsonify({"vehicles": vehicles})


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
    
    
   
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify({"users": users})


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

# Associate a status for a vehicle 

@app.route('/assignStatusToVehicle', methods=['GET'])
def assign_status_to_vehicle():
    try:
        # Récupérer les données du corps de la requête au format JSON
        data = request.args
        # Extraire les informations nécessaires du corps de la requête
        vehicle_id = data.get('vehicle_id')
        status_id = data.get('status_id')

        # Vérifier si le véhicule et le statut existent dans la base de données
        my_vehicle = Vehicle.query.get(vehicle_id)
        my_status = Statuss.query.get(status_id)

        if my_vehicle and my_status:
            # Créer un objet StatussVehicule avec la date actuelle
            assignment_date = datetime.now().date()
            status_vehicle = StatussVehicule(id_vehicule=my_vehicle.id, id_status=my_status.id, date=assignment_date)

            # Ajouter l'objet StatussVehicule à la liste de "status" du véhicule
            my_vehicle.status.append(status_vehicle)

            # Enregistrer les modifications dans la base de données
            mydb.session.commit()

            return jsonify({"message": "Statut assigné au véhicule avec succès"})
        else:
            return jsonify({"message": "Véhicule ou statut introuvable"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/assignSubscriptionToVehicle', methods=['POST'])
def assign_sub_vehicle():
    basic = 
    moyen = 48/60
    vip = 86/60
    
    args = request.json 
    id_vehicle = args.get("id_vehicle") 
    id_subc = args.get("id_subc")
    
    subscription = Subscription.query.get(id_subc)
    vehicle = Vehicle.query.get(id_vehicle)
    
    if subscription  and vehicle :
        if subscription.type == "basic":
            new_subscription_vehicle = SubscriptionVehicle(id_vehicle=id_vehicle, id_subc=id_subc, time=basic)
        elif subscription.type == "moyen":
            new_subscription_vehicle = SubscriptionVehicle(id_vehicle=id_vehicle, id_subc=id_subc, time=moyen)
        elif subscription.type == "vip":
            new_subscription_vehicle = SubscriptionVehicle(id_vehicle=id_vehicle, id_subc=id_subc, time=vip)
        mydb.session.add(new_subscription_vehicle)
        mydb.session.commit()
        
        return jsonify({"message": "Subscription assignée au véhicule avec succès"})
    else:
        return jsonify({"message": "La subscription ou la vehicule n'existe pas "})
      

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
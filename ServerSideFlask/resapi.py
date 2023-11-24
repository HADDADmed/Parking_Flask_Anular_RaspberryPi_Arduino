# import crypt
import serial
from hashlib import scrypt
from flask import Flask, request, jsonify , Response
import json
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
import cv2
import pytesseract
import time

app = Flask(__name__)
CORS(app)

lcd_serial = serial.Serial('/dev/ttyUSB1', 9600)
arduino_serial = serial.Serial('/dev/ttyUSB0', 9600) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@127.0.0.1:3306/parking'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

mydb = SQLAlchemy(app)

# Model 

class StatussVehicule(mydb.Model):
    __tablename__ = 'stat_vehic'
    id = mydb.Column(mydb.Integer, primary_key=True, autoincrement=True) 
    id_vehicule = mydb.Column('id_vehicule', mydb.Integer, mydb.ForeignKey('vehicle.id'), primary_key=True)
    id_status = mydb.Column('id_status', mydb.Integer, mydb.ForeignKey('statuss.id'), primary_key=True)
    date = mydb.Column('date', mydb.DateTime)
    time = mydb.Column('time',mydb.Integer)
    vehicle = mydb.relationship('Vehicle', back_populates='status')
    status = mydb.relationship('Statuss', back_populates='vehicles')
    def serialize(self):
        return {
            'id': self.id,
            'status_type': self.status.type,
            'date': self.date,
            'time_left_in_hours': self.time,
            
            # Add more fields as needed
        }
    
    
class Vehicle(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    matricule = mydb.Column(mydb.String(255))
    model = mydb.Column(mydb.String(255))
    sub_id = mydb.Column(mydb.Integer, mydb.ForeignKey('subscription.id'))
    user_id = mydb.Column(mydb.Integer, mydb.ForeignKey('user.id'))
    status = mydb.relationship('StatussVehicule' , back_populates='vehicle')
    def serialize(self):
        return {
            'id': self.id,
            'matricule': self.matricule,
            'model': self.model,
            'user_id': self.user_id,
            'subscription': self.subscription.serialize2(),
            'statuses': list(map(lambda status: status.serialize(), self.status))
        }
    
    
    
class Statuss(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    type = mydb.Column(mydb.String(255))
    vehicles = mydb.relationship('StatussVehicule' ,back_populates='status')  # Correction ici
    def serialize(self):
        return {
            'id': self.id,
            'type': self.type,
            # Add more fields as needed
        }
    

class Subscription(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    type = mydb.Column(mydb.String(255))
    description = mydb.Column(mydb.String(255))
    vehicles = mydb.relationship('Vehicle', backref='subscription')
    def serialize(self):
        return {
            'id': self.id,
            'type': self.type,
            'description': self.description,
            'vehicles': list(map(lambda vehicle: vehicle.serialize(), self.vehicles))
            # Add more fields as needed
        }
    def serialize2(self):
        return {
            'id': self.id,
            'type': self.type,
            'description': self.description,
            # Add more fields as needed
        }

class User(mydb.Model):
    id = mydb.Column(mydb.Integer, primary_key=True)
    name = mydb.Column(mydb.String(255))
    username = mydb.Column(mydb.String(255))
    password = mydb.Column(mydb.String(255))
    phone = mydb.Column(mydb.Integer)
    age = mydb.Column(mydb.Integer)
    isAdmin = mydb.Column(mydb.Boolean)
    vehicles = mydb.relationship('Vehicle', backref='user')
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'age': self.age,
            'isAdmin': self.isAdmin,
            'phone' :self.phone, 
            'vehicles': list(map(lambda vehicle: vehicle.serialize(), self.vehicles))
            # Add more fields as needed
        }


@app.route('/')
def index():
    mydb.create_all() 
    return "Hello World"


@app.route('/createDb', methods=['GET'])
def createDb():
    mydb.create_all()
    return jsonify({"message": "Database created successfully"})



@app.route('/updateDataBase', methods=['GET'])
def updateDataBase():
    mydb.create_all()
    return jsonify({"message": "Database updated successfully"})


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
    
    user = User.query.filter_by(username=username).first()
    
    print(user)
    if user:
        # check if the password is correct
        if user.password == password:
            # check if the user is admin
            if user.isAdmin:
                return jsonify({"status":200 , "message": "login successfully", "isAdmin": True,"user": user.serialize()})
            else:
                return jsonify({"status":200 , "message": "login successfully", "isAdmin": False,"user": user.serialize()})
        else:
            return jsonify({"status":400 , "message": "password is incorrect"})
    else:
        return jsonify({"status":400 , "message": "username is incorrect"})


# get vehicles by user id get Method
@app.route('/getVehiclesByUserId/<int:id>', methods=['GET'])
def getVehiclesByUserId(id):
    vehicles = Vehicle.query.filter_by(user_id=id).all()
    vehicles = list(map(lambda vehicle: vehicle.serialize(), vehicles))
    return jsonify({"vehicles": vehicles})


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
    # serialize the list of users from a list of User objects to a list of dictionaries
    users = list(map(lambda user: user.serialize(), users))
    return jsonify({"users": users})


# for User 
@app.route('/saveUser', methods=['POST'])
def saveUser():
    args = request.json
    name = args.get('name')
    phone = args.get('phone')
    username = args.get('username')
    password = args.get('password')
    age = args.get('age')

    # Créez une instance de la classe User
    newUser = User(name=name, username=username, password=password, age=age , phone=phone ,isAdmin=False )

    # Ajoutez le nouvel utilisateur à la base de données
    mydb.session.add(newUser)
    mydb.session.commit()

    return jsonify({"message": "User saved successfully", "id": newUser.id})

# Associate a status for a vehicle 

@app.route('/assignStatusToVehicle', methods=['Post'])
def assign_status_to_vehicle():
    try:
        # Récupérer les données du corps de la requête au format JSON
        data = request.json
        # Extraire les informations nécessaires du corps de la requête
        vehicle_id = data.get('vehicle_id')
        status_id = data.get('status_id')

        # Vérifier si le véhicule et le statut existent dans la base de données
        my_vehicle = mydb.session.get(Vehicle, vehicle_id )
        my_status = mydb.session.get(Statuss, status_id )

        subscription =  my_vehicle.subscription
        # Assuming assignment_date is a datetime.date object
        assignment_date = datetime.now().date()
        # Calculate the time difference in hours
        if my_vehicle  and subscription :
            # Créer un objet StatussVehicule avec la date actuelle
            assignment_date = datetime.now().date()
            # fetch for te last status of the vehicle if it's not the first time
            last_status = StatussVehicule.query.filter_by(id_vehicule=vehicle_id).order_by(StatussVehicule.date.desc()).first()
            print("last_status")
            print(last_status)
            if last_status:
                # check if the last status to asign the opposite status
                if last_status.id_status == 1:
                    id_statuss = 2
                else:
                    id_statuss = 1
                
                new_time = last_status.time - 1 if id_statuss == 2 else last_status.time
                new_status = StatussVehicule(id_vehicule=vehicle_id, id_status=id_statuss, date=assignment_date, time=new_time)
                # add the new status to the database
                mydb.session.add(new_status)
                # save the changes
            else : 
                # asign the new status to the vehicle for the first time and asigm the time left by comparing the subscription duration 
                 if subscription.type == 'basic' or subscription.type == 'BASIC' or subscription.type == 'Basic' : 
                     status_vehicle = StatussVehicule(id_vehicule=my_vehicle.id, id_status=my_status.id, date=assignment_date , time= 24)
                 elif subscription.type == 'moyen' or subscription.type == 'MOYEN' or subscription.type == 'Moyen' :
                     status_vehicle = StatussVehicule(id_vehicule=my_vehicle.id, id_status=my_status.id, date=assignment_date , time= 48)
                 else :
                     status_vehicle = StatussVehicule(id_vehicule=my_vehicle.id, id_status=my_status.id, date=assignment_date , time= 86)
                 my_vehicle.status.append(status_vehicle)

            # Ajouter l'objet StatussVehicule à la liste de "status" du véhicule
            # Enregistrer les modifications dans la base de données
            mydb.session.commit()

            return jsonify({"message": "Statut assigné au véhicule avec succès"})
        else:
            return jsonify({"message": "Véhicule ou statut introuvable"})
    except Exception as e:
        return jsonify({"error": str(e)})
      
      
# handling the arduino request
@app.route('/checkAutorizationVehicle', methods=['POST'])
def checkAutorizationVehicle():
    args = request.json
    rfId = args.get('rfId')
    # check if the vehicle exist in the database and the subscription is not null or expired or empty
    vehicle = Vehicle.query.filter_by(matricule=rfId).first()
    if vehicle and vehicle.subscription :
        # check if the last status is 1 or 2 
        last_status = StatussVehicule.query.filter_by(id_vehicule=vehicle.id).order_by(StatussVehicule.date.desc()).first()
        if last_status:
            if last_status.id_status == 1:
                return jsonify({"status":200 , "message": "Autorized"})
            else:
                return jsonify({"status":400 , "message": "Not Autorized"})
        else:
            return jsonify({"status":400 , "message": "Not Autorized"})
    else:
        return jsonify({"status":400 , "message": "Not Autorized"})


@app.route('/checkAutorizationVehicleAndAsigneStatus', methods=['POST'])
def checkAutorizationVehicleAndAsigneStatus():
    args = request.json
    rfId = args.get('rfId')
    vehicle_id = args.get('vehicle_id')

    # check if the vehicle exist in the database and the subscription is not null or expired or empty
    vehicle = Vehicle.query.filter_by(id=vehicle_id).first()
    if vehicle and vehicle.subscription :
        # check if the last status is 1 or 2 
        last_status = StatussVehicule.query.filter_by(id_vehicule=vehicle.id).order_by(StatussVehicule.date.desc()).first()
        if last_status:
            if last_status.id_status == 1:
                # asign the new status to the vehicle for the first time and asigm the time left by comparing the subscription duration 
                if vehicle.subscription.type == 'basic' or vehicle.subscription.type == 'BASIC' or vehicle.subscription.type == 'Basic' : 
                    status_vehicle = StatussVehicule(id_vehicule=vehicle.id, id_status=2, date=datetime.now().date() , time= 24)
                elif vehicle.subscription.type == 'moyen' or vehicle.subscription.type == 'MOYEN' or vehicle.subscription.type == 'Moyen' :
                    status_vehicle = StatussVehicule(id_vehicule=vehicle.id, id_status=2, date=datetime.now().date() , time= 48)
                else :
                    status_vehicle = StatussVehicule(id_vehicule=vehicle.id, id_status=2, date=datetime.now().date() , time= 86)
                vehicle.status.append(status_vehicle)
                mydb.session.commit()
                return jsonify({"status":200 , "message": "Autorized and status asigned"})
            else:
                return jsonify({"status":400 , "message": "Not Autorized and status not asigned"})
        else:
            return jsonify({"status":400 , "message": "Not Autorized and status not asigned"})
    else:
        return jsonify({"status":400 , "message": "Not Autorized and status not asigned"})





def ConnectionAR(matricule):
    with app.app_context():
        my_vehicle = Vehicle.query.get(matricule)
        if my_vehicle:
            print("Voiture dans le parking ")
            # Send request to Arduino to open the barrier
            arduino_serial.write(b'OPEN_BARRIER\n')
        else:
            print("Voiture non trouvée dans le parking ")
            # Send request to LCD to display a message
            lcd_serial.write(b'ShowMessage:Car not found in database\n')

pytesseract.pytesseract.tesseract_cmd = pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

def text_detection(frame):
    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to preprocess the image
    _, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV)

    # Use pytesseract to perform OCR on the preprocessed image
    text = pytesseract.image_to_string(thresh, config='--psm 11')

    return text

def video_stream():
    vs = cv2.VideoCapture(0)

    while True:
        ret, frame = vs.read()

        # Check if the frame is successfully read
        if not ret:
            print("Error reading frame from camera.")
            break

        # Detect text in the frame
        detected_text = text_detection(frame)

        # If text is detected, print it in the console
        if detected_text.strip():
            ConnectionAR(detected_text)
            break

        _, jpeg = cv2.imencode('.jpg', frame)

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

    # Release the VideoCapture and destroy all OpenCV windows
    vs.release()
    cv2.destroyAllWindows()

@app.route("/ws")
def video_feed():
    return Response(video_stream(),
                    mimetype='multipart/x-mixed-replace;boundary=frame')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
    
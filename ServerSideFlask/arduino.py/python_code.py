import mysql.connector
import cv2
import pytesseract
from PIL import Image
import os
import serial
import time
# Remplacez les valeurs suivantes par les informations de votre base de données
host = "localhost"
user = "root"
password = ""
database = "parking"

# Établir une connexion à la base de données
connexion = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)

# Créer un objet curseur pour exécuter des requêtes SQL
curseur = connexion.cursor()
device = 'COM10'  # Change this to the serial port you are using
try:
    print("Trying...", device)
    arduino = serial.Serial(device, 9600)
except Exception as e:
    print(f"Failed to connect on {device}. Exception: {e}")
while True:
    time.sleep(1)
    try:
        data = arduino.readline().decode('utf-8').strip()
        print(data)
        requete = "SELECT * FROM vihecle WHERE matricule = %s"
        parametres = (data)
        curseur.execute(requete, parametres)
        resultat = curseur.fetchall()
        if resultat :
            print(resultat)
        else :
            print("Voiture non trouver")
        
        # Commented out the database-related code
        # pieces = data.split(" ")
        # try:
        #     cursor.execute(
        #         """INSERT INTO <your_table_name> (ID, Member_ID, allowed_members) VALUES (NULL, %s, %s)""",
        #         (pieces[0], pieces[1])
        #     )
        #     dbConn.commit()
        # except MySQLdb.IntegrityError as ie:
        #     print(f"Failed to insert data. IntegrityError: {ie}")
        # except Exception as ex:
        #     print(f"An error occurred: {ex}")

    except Exception as e:
        print(f"Processing error: {e}")

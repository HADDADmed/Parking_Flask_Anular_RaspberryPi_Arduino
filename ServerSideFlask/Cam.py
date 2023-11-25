import mysql.connector
import cv2
import pytesseract
from PIL import Image
import os
import time 
import serial
host = "localhost"
user = "root"
password = ""
database = "parking"
from datetime import datetime
connexion = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)
def OpenServoM(arduino_port , variable) :
     ser = serial.Serial(arduino_port, 9600)
     time.sleep(2)  # Attendez que la connexion soit établie

    # Envoie l'angle au servomoteur
     ser.write(str(variable).encode())
     print(f"Servomoteur ouvert à l'angle : {variable}")

def CloseServoM(arduino_port , angle):
     ser = serial.Serial(arduino_port, 9600)
     time.sleep(2)  # Attendez que la connexion soit établie

    # Envoie l'angle au servomoteur
     ser.write(str(angle).encode())
     print(f"Servomoteur ouvert à l'angle : {angle}")
    # Ferme le port série
     ser.close()
     
curseur = connexion.cursor()
camera = cv2.VideoCapture(0)
while True:
        _, image = camera.read()

        # Check if the frame is not None
        if image is not None:
            cv2.imshow('Text detection', image)

            path = r'/usr/bin/tesseract'
            img = Image.fromarray(image)
            pytesseract.tesseract_cmd = path
            text = pytesseract.image_to_string(img)
            Matricule = text.replace(" ", "")  # Remove spaces from Matricule
            if(Matricule != ""):
                print(f"Matricule: {Matricule}")

            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break

            time.sleep(2)

            if Matricule != '':
                    Matricule = Matricule.strip()
                    print(Matricule)
                    requete = "SELECT * FROM vehicle WHERE matricule = %s"
                    parametres = (Matricule,)
                    curseur.execute(requete, parametres)
                    resultat = curseur.fetchall()
                    if resultat:
                        id_vehicle = resultat[0][0]
                        requete_status = "SELECT * FROM stat_vehic WHERE id_vehicule = %s ORDER BY date DESC LIMIT 1"
                        parame_status = (id_vehicle,)
                        curseur.execute(requete_status, parame_status)
                        resultat_status = curseur.fetchall()
                        if  requete_status :
                            if resultat_status:
                                if resultat_status[0][4] != 0:
                                    if resultat_status[0][2] == 1:
                                        time1 = resultat_status[0][4] - 1
                                        requete_insert_status = "INSERT INTO stat_vehic (id_vehicule, id_status, date, time) VALUES (%s, %s, %s, %s)"
                                        status_id = 2
                                        parametres_insert_status = (id_vehicle, status_id, datetime.now().date(), time1)
                                        curseur.execute(requete_insert_status, parametres_insert_status)
                                        OpenServoM('COM10', 1)
                                        connexion.commit()
                                        break
                                    else:
                                        time2 = resultat_status[0][4]
                                        requete_insert_status = "INSERT INTO stat_vehic (id_vehicule, id_status, date, time) VALUES (%s, %s, %s, %s)"
                                        status_id = 1 
                                        parametres_insert_status = (id_vehicle, status_id, datetime.now().date(), time2)
                                        curseur.execute(requete_insert_status, parametres_insert_status)
                                        OpenServoM('COM10', 1)
                                        connexion.commit()
                                        break
                                else:
                                     OpenServoM('COM10', 0)
                                     print("Abonnement expirer")   
                            else :
                                  sub_id = resultat[0][3]
                                  requete_subscription = "SELECT * FROM subscription WHERE id = %s"
                                  parametres_subscription = (sub_id,)
                                  curseur.execute(requete_subscription, parametres_subscription)
                                  resultat_subscription = curseur.fetchall()
                                  if resultat_subscription:
                                        type_abonnement = resultat_subscription[0][1]
                                        print(f"Type d'abonnement : {type_abonnement}")
                                        if type_abonnement == "basic":
                                            requete_insert_status = "INSERT INTO stat_vehic (id_vehicule, id_status, date, time) VALUES (%s, %s, %s, %s)"
                                            status_id = 1
                                            parametres_insert_status = (id_vehicle, status_id, datetime.now().date(), 24)
                                            curseur.execute(requete_insert_status, parametres_insert_status)
                                            OpenServoM('COM10', 1)
                                            connexion.commit()
                                        elif type_abonnement == "moyen":
                                            requete_insert_status = "INSERT INTO stat_vehic (id_vehicule, id_status , date ,time ) VALUES (%s, %s , %s , %s )"
                                            status_id = 1 
                                            parametres_insert_status = (id_vehicle, status_id ,datetime.now().date() , 48)
                                            curseur.execute(requete_insert_status, parametres_insert_status)
                                            OpenServoM('COM10', 1)
                                            connexion.commit()
                                            break
                                            
                                        else :
                                            requete_insert_status = "INSERT INTO stat_vehic (id_vehicule, id_status , date ,time ) VALUES (%s, %s ,%s ,%s )"
                                            status_id = 1
                                            parametres_insert_status = (id_vehicle, status_id ,datetime.now().date() , 86)
                                            curseur.execute(requete_insert_status, parametres_insert_status)
                                            OpenServoM('COM10', 1)
                                            connexion.commit()
                                            break
                                    
                                
                    else :
                         print("voiture non trouver")
                                          
curseur.close()
connexion.close()
     
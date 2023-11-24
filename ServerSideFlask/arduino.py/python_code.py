import serial
# import MySQLdb
import time

# Commented out the database connection and cursor

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

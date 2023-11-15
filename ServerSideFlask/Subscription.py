# Inside the Subscription class
class Subscription:
    def __init__(self, id, subscription_type, description, mydb):
        self.id = id
        self.subscription_type = subscription_type
        self.description = description
        self.mydb = mydb

    def save(self):
        myCursor = self.mydb.cursor()
        req = "INSERT INTO subscription (type, description) VALUES (%s, %s)"
        val = (self.subscription_type, self.description)
        myCursor.execute(req, val)
        self.mydb.commit()
        print(myCursor.rowcount, "record inserted")

    def delete(self):
        myCursor = self.mydb.cursor()
        req = "DELETE FROM subscription WHERE id = %s"
        val = (self.id,)
        myCursor.execute(req, val)
        self.mydb.commit()
        print(myCursor.rowcount, "record(s) deleted")

    def update(self, new_type, new_description):
        myCursor = self.mydb.cursor()
        req = "UPDATE subscription SET type = %s, description = %s WHERE id = %s"
        val = (new_type, new_description, self.id)
        myCursor.execute(req, val)
        self.mydb.commit()
        print(myCursor.rowcount, "record(s) updated")

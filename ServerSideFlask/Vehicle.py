class Vehicle:
    def __init__(self, id, matrecule, model, userId, abonnement_id, mydb):
        self.id = id
        self.matrecule = matrecule
        self.model = model
        self.userId = userId
        self.abonnement_id = abonnement_id
        self.mydb = mydb
    def save(self):
        myCursor = self.mydb.cursor()
        req = "insert into vehicle (matricule, model, user_id, sub_id) values (%s, %s, %s, %s)"
        val = (self.matrecule, self.model, self.userId, self.abonnement_id)
        myCursor.execute(req, val)
        self.mydb.commit()
        print(myCursor.rowcount, "record ins")
    def delete(self):
        myCursor = self.mydb.cursor()
        req = "DELETE FROM vehicle WHERE id = %s"
        val = (self.id,)
        myCursor.execute(req, val)
        self.mydb.commit()
        print(myCursor.rowcount, "record(s) deleted")
    def update(self, new_matricule, new_model):
        myCursor = self.mydb.cursor()
        req = "UPDATE vehicle SET matricule = %s, model = %s WHERE id = %s"
        val = (new_matricule, new_model, self.id)
        myCursor.execute(req, val)
        self.mydb.commit()
        print(myCursor.rowcount, "record(s) updated")
        
        
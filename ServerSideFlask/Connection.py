class Connection :

    def __init__(self , app , MySQL):
        self.app = app 
        app.config['MYSQL_HOST'] = 'localhost'
        app.config['MYSQL_USER'] = 'root'
        app.config['MYSQL_PASSWORD'] = ''
        app.config['MYSQL_DB'] = 'parking'

        MySQL(app)
        
   
    
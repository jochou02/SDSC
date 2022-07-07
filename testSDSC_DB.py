# Module Import
'''
   BE SURE TO
   pip install mariadb
'''

import mariadb
import sys

print("Starting...")

# Instantiate Connection
try:
      '''
         use this when connecting to our db with your
         own connector (django etc.).

         user_name: kfrd22
         password: sungod123

         has access/privilege to all databases and tables
         because no reason why not at the moment.

         let me know if you guys would like add more users
      '''
      
      conn = mariadb.connect(
      host="132.249.242.127",
      port=3306,
      user="kfrd22",
      password="sungod123")
   
      cur = conn.cursor()

      '''
            replace with your own name
      '''
      cur.execute("INSERT INTO test_ground.roster "
                  "(fname, lname) "
                  "VALUES ('Reimu', 'Hakurei')")

      conn.commit()
   
      
except mariadb.Error as e:
      print(e.errno)
      print(f"Error connecting to the database: {e}")
      sys.exit(1)

print("Exiting...")
conn.close()

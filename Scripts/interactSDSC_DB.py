# Module Import
'''
   BE SURE TO
   pip install mariadb
'''

import mariadb
import sys
import random

print("Starting...")

# Instantiate Connection
try:


    conn = mariadb.connect(
        host="132.249.242.127",
        port=3306,
        user="kfrd22",
        password="sungod123")
   
    cur = conn.cursor()
    cur.execute("USE merge_test")

    print("1. Show all tables")
    print("2. Dump a table")
    print("3. Clear a table")
    print("4. Drop and recreate merge_test2 for re-migration")

    print("5. Quit")

    opt = input("Enter number without dot: ")

    while(opt != "5"):
        if (opt == "1"):
            cur.execute("SHOW TABLES")
            for i in cur:
                print(i)

        elif (opt == "2"):
            temp = input("Which table would you like to dump:")
            cur.execute(f"SELECT * FROM merge_test2.{temp}")
            for i in cur:
                print(i)

        elif (opt == "3"):
            temp = input("Which table would you like to clear:")
            cur.execute(f"DELETE FROM merge_test2.{temp}")
            conn.commit()

        elif (opt == "4"):
            cur.execute("DROP DATABASE merge_test2")
            cur.execute("CREATE DATABASE merge_test2")
            conn.commit()
            

        opt = input("Enter number without dot: ")

            

      
   
      
except mariadb.Error as e:
      print(e.errno)
      print(f"Error connecting to the database: {e}")
      sys.exit(1)

print("Exiting...")
conn.close()





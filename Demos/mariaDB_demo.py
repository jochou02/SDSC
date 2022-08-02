# -*- coding: utf-8 -*-
"""
Created on Tue Jul  5 10:10:27 2022

@author: Jiting Shen
"""

# Module Import
import mariadb
import sys
import secrets
import hashlib

'''
    This is a demo of MariaDB connector. Does not work at the moment as our cloud 
    instance is not yet up online.
    
    The structure of my_test is the following:
    
        my_test --- roster
                        (uid, fname, lname {in int/string/string. Sample table and 
                                            not related to other tables})
                --- user_login
                        (id {unique and auto-incremented, identifier across tables})
                        (email {unique})
                        (pword {string, hashed and salted})
                        (salt {string, salt used to hash pword})
                --- user_info
                        (id {unique and auto-incremented, indentifier across tables,
                             always matches id in user_login})
                        (fname, lname {string, placeholders for demo purposes})
                        
    user_login and user_info kept seperate for demo purpose.
'''

'''
    Little demo that checks whether user with certan first name exist. Prints 
    out all user with that first name if there exists at least one.
    
    Note cur works as iterator after fetching info from DB.
'''

def check_user_exist(cur):
    u_fname = input()
    cur.execute(f"SELECT * FROM my_test.roster WHERE fname='{u_fname}'")
    
    temp = cur.next()
    if (temp == None):
        print("User does not exist")
    else:
        print(temp)
        
        for i in cur:
            print(i)


'''
    Takes in user's login info, and attempts to insert given info into user_login.
    
    Then, takes in user's info and attempts to insert given info into user_info. 
    This is done for demonstration purpose only. Realistically, we only have to 
    insert the id to establish a mapping between user_info and user_login.
    
    Any failure during insertion will be caught and handled accordingly. In the 
    future, figure out a way to avoid magic number error codes
    
    Returns -1 on failure, or newly registered user's id on success
'''
    
def register_user(cur):
    u_email = input("Please input your email:")
    u_password = input("Please input your password:")
    
    # Salt generation, check for salt colision in the future
    # Change token size for better security (might not be needed)
    u_salt = str(secrets.token_hex(8))
    
    u_salted = hashlib.sha256((u_password + u_salt).encode('utf-8')).hexdigest()
    print(type(u_salted))
    
    try:
        cur.execute("INSERT INTO my_test.user_login "
                    "(email, pword, salt) "
                    f"VALUES ('{u_email}', '{u_salted}', '{u_salt}')")
      
    except mariadb.Error as e:
        if e.errno == 1062:  #Err code for dulplicate
            print("User already exists")
        else:
            print(f"Error connecting to the database: {e}")
            
        return -1
    
    # For demo purpose only
    u_fname = input("Please input your first name:")
    u_lname = input("Please input your last name:")
    
    try:
        cur.execute("INSERT INTO my_test.user_info "
                    "(id, fname, lname) "
                    f"VALUES ('{cur.lastrowid}', '{u_fname}', '{u_lname}')")
      
    except mariadb.Error as e:
        print(f"Error connecting to the database: {e}")
        return -1
    
    # Note lastrowid is an attribute of cursor, so this operation is cheap
    return cur.lastrowid


'''
    Verifies user's email and pass word against what's in database to determine 
    whether login is successful.

    Returns id on success, or -1 on failure, with corresponding message.
'''

def login_user(cur):
    u_email = input("Please input your email:")
    u_password = input("Please input your password:")
    
    cur.execute("SELECT id, pword, salt FROM my_test.user_login "
                f"WHERE email ='{u_email}'")
    
    # email is supposed to be unique, but could introduce test to check for 
    # dulplication.
    temp = cur.next()
    if (temp == None):
        print("User does not exist.")
        return -1
    
    # temp[0] => id 
    # temp[1] => hased and salted pword
    # temp[2] => salt
    
    # Could store temp[0/1/2] in variables to increase readability
    u_salted = hashlib.sha256((u_password + temp[2]).encode('utf-8')).hexdigest()
    
    if (u_salted == temp[1]):
        print("Login successful")
        return temp[0]
    else:
        print("Incorrect Password")
        return -1


'''
    Shares the user info associated with given u_id. For demonstration purpose 
    only. irl we could process the info and return it in a single container
'''

def share_user_info(cur, u_id):
    cur.execute("SELECT * FROM my_test.user_info "
                f"WHERE id = '{u_id}'")
    
    temp = cur.next()
    
    # Rather redundant. share_user_info() should only be called using u_id 
    # pulled directly from server
    if temp == None:
        print(f"User with id {u_id} does not exist")
    
    else:
        # For demonstration only.
        print(temp[0], temp[1], temp[2])


'''
    Dumps all info from user_info and user_login. Useful for fetching all info 
    in tables such as when passing input for matching
'''

def dump_database(cur):
    print("Dumping data from user_login...")
    cur.execute("SELECT * FROM my_test.user_login")
    for i in cur:
        print(i)
        
    print("Dumping data from user_info...")
    cur.execute("SELECT * FROM my_test.user_info")
    for i in cur:
        print(i)
        

'''
    Main menu interface for the demo
'''

def main_menu():
    print("Enter the option you would like to try: [Enter number only] ")
    print("1. Register User")
    print("2. Login")
    print("3. Share user info")
    print("4. Dump database")
    print("5. Quit")
    
    return int(input())

print("Starting...")

# Instantiate connection
try:
    # Sample connection info for my home server 
    conn = mariadb.connect(
    host="insert server ip",
    port=3306,
    user="goat",
    password="???")
    
    # Create cursor that could execute SQL commands on DB
    cur = conn.cursor()

# Error handling for connection
except mariadb.Error as e:
    print(e.errno)
    print(f"Error connecting to the database: {e}")
    sys.exit(1)
    
print("Connection success")
print("############")

# Choose the functionality you want to try
while (opt := main_menu()):
    if (opt == 1):
        if (register_user(cur) != -1):
            #Use commit to commit changes to database
            conn.commit()
            
    elif (opt == 2):
        u_id = login_user(cur)
        # Login successful
        if (u_id != -1):
            # Potentially use flag to show whether user is logged in
            # Pass u_id to do things
            print(f"You are now logged into u_id = '{u_id}'")
    
    elif (opt == 3):
        # How share_user_info should be used, by using id, the unique identifier
        # that's matched across tables
        u_id = input("Please enter the u_id of the user:")
        share_user_info(cur, u_id)
        
    elif (opt == 4):
        # Print out all rows in database
        dump_database(cur)
    
    elif (opt == 5):
        break
    
    else:
        print("Invalid Input, please try again")
    
    print("############")

print("Exiting...")


# Close Connection
conn.close()
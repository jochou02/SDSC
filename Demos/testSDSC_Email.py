import smtplib
from email.message import EmailMessage

'''
    Sample program that sends out email using our email server.

    Should suffice for our purpose (sending out auth emails and so on.

    Only work on SDSC cloud instance unless you have a local SMTP server
    running.
'''

content_template = "Insert content here."

# Create a text/plain message
msg = EmailMessage()

msg.set_content(content_template)
mgs['Subject'] = "Insert subject here."

# Only enter the part before @. e.g. jis029, not jis029@ucsd.edu
mgs['From'] = "Insert name you would like to use"
msg['To'] = "Insert recipient's email address"

s = smtplib.SMTP('localhost')
s.send_message(msg)
s.quit()

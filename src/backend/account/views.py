import secrets
from traceback import print_exception

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication

from api.serializers import *

from .models import Student

import redis

import smtplib
from email.message import EmailMessage

'''
    Test things out. Deprecated. 
'''


class foo(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        print(request.user)

        return Response({})


'''
    Registers a user using given info, and generate a auth 
    token for it.
'''


class RegisterView(APIView):
    # No need for authentication here

    # Don't forget to create user for other app using the same id here.
    def post(self, request):
        request_content = json.loads(request.body.decode("utf-8"))
        new_user = User.objects.create_user(request_content['username'],
                                            password=request_content['password'])

        new_user.email = request_content['email']
        new_user.first_name = request_content['first_name']
        new_user.last_name = request_content['last_name']

        new_user.save()

        new_student = Student(pk=new_user.id, student_user=new_user)
        new_student.first_name = new_user.first_name
        new_student.last_name = new_user.last_name
        new_student.email = new_user.email

        # Hook the quiz up from here.

        new_student.save()

        return Response({})


'''
    Test things out. Deprecated. 
'''


class GetUserInfoView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        serializer = AuthUserSerializer(request.user)

        return Response(serializer.data)


'''
    First delete Token, then Student, then User. Add in others as needed.
'''


class DeleteUserView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # Delete other accounts that has to do with auth_user here.

        Token.objects.get(user=request.user).delete()

        # Prob should go through connection tables and delete from there as well
        Student.objects.get(pk=request.user.id).delete()
        User.objects.get(pk=request.user.id).delete()

        return Response({})


'''
    Send a random code to the supplied email address.
    Re-use for both forgot password and register account, by introducing
    status code to differentiate use case.
'''


class GenEmailAuth(APIView):
    # No need for authentication here
    def post(self, request):
        request_content = json.loads(request.body.decode("utf-8"))
        temp = User.objects.filter(email=request_content['email'])

        if (request_content['mode'] == 'reg'):
            if (temp):
                return Response({'auth_server': '',
                                 'status': 1})
            else:
                # Put this in a try block. Since we haven't registered, we don't know if email is lit
                return Response({'auth_server': send_email(request_content['email']),
                                 'status': 0})

        elif (request_content['mode'] == 'fpwd'):
            if (temp):
                return Response({'auth_server': send_email(request_content['email']),
                                 'status': 0})
            else:
                return Response({'auth_server': '',
                                 'status': 1})


'''
    Updates the user's password using the unique email and new password 
    supplied by the user.
'''


class UpdatePassword(APIView):
    def post(self, request):
        request_content = json.loads(request.body.decode("utf-8"))
        temp = User.objects.get(email=request_content['email'])

        # No error handling is needed because we have already confirmed
        # existence of this user in GenEmailAuth.

        # Note here we need to use set_password, because we can't store
        # password in plain text
        temp.set_password(request_content['password'])
        print(temp.password)
        temp.save()

        return Response({})


# Use the snippet I had once we are on SDSC

# We be passing all these credentials in plain text, let's hope
# nobody attacks our site lol
def send_email(email):
    # See snippet on github about sending email
    # Use that once we are on SDSC cloud. For now, just return a number

    temp = str(secrets.token_hex(3))
    #     content_template = f"Your verification code is: {temp}"

    #     # Create a text/plain message
    #     msg = EmailMessage()

    #     msg.set_content(content_template)
    #     msg['Subject'] = "UC Socially Undead - Verification Code"

    #     # Only enter the part before @. e.g. jis029, not jis029@ucsd.edu
    #     msg['From'] = "admin"
    #     msg['To'] = "kfrd2022@gmail.com"

    #     s = smtplib.SMTP('localhost')
    #     s.send_message(msg)
    #     s.quit()

    return temp

#地図: SetUserPrefs API

# Naisu jobu! お疲れさま---
class SetUserPrefs(APIView):
    def post(self, request):
        request_content = json.loads(request.body.decode("utf-8"))
        request_user_id = request_content["user_id"]
        temp = Student.objects.get(id=request_user_id)

        if request_content['college']:  
            temp.set_college(request_content['college'])
        if request_content['major']:  
            temp.set_major(request_content['major'])
        if request_content['phone']:  
            temp.set_phone(request_content['phone'])
        if request_content['ig']:
            temp.set_ig(request_content['ig'])
        if request_content['discord']:
            temp.set_discord(request_content['discord'])
        if request_content['user_interest1']:
            temp.set_user_interest1(request_content['user_interest1'])
        if request_content['user_interest2']:
            temp.set_user_interest2(request_content['user_interest2'])
        if request_content['user_interest3']:
            temp.set_user_interest3(request_content['user_interest3'])

        temp.save()


        #also need to update redis
        r = redis.Redis(host="132.249.242.203")
        r.set(f"student_{temp.id}", temp)

        # Could return success/failure if we introduce server-side error handling for inputs
        return Response({})
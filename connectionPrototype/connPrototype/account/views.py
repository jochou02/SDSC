import secrets

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication

from .serializers import *

import smtplib
from email.message import EmailMessage

'''
    Test things out 
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

        return Response({})


class GetUserInfoView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        serializer = AuthUserSerializer(request.user)

        return Response(serializer.data)


class DeleteUserView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # Delete other accounts that has to do with auth_user here.

        Token.objects.get(user=request.user).delete()
        User.objects.get(pk=request.user.id).delete()

        return Response({})


# Send a random code to the supplied email address.
# Re-use for both forgot password and register account, by introducing
# status code to differentiate use case.
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

    content_template = f"Your verification code is: {str(secrets.token_hex(3))}"

    # Create a text/plain message
    msg = EmailMessage()

    msg.set_content(content_template)
    mgs['Subject'] = "UC Socially Undead - Verification Code"

    # Only enter the part before @. e.g. jis029, not jis029@ucsd.edu
    mgs['From'] = "admin"
    msg['To'] = "kfrd2022@gmail.com"

    s = smtplib.SMTP('localhost')
    s.send_message(msg)
    s.quit()

    return secrets.token_hex(3)


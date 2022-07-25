from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication

from .serializers import *

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

    # Create users in other apps e.g. ConnUser/TutorUser etc.
    def post(self, request):
        request_content = json.loads(request.body.decode("utf-8"))
        new_user = User.objects.create_user(request_content['username'],
                                            password=request_content['password'])

        new_user.email = request_content['email']
        new_user.first_name = request_content['first_name']
        new_user.last_name = request_content['last_name']

        new_user.save()

        print(new_user.first_name)

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


class GenEmailAuth(APIView):
    # No need for authentication here
    def get(self, request):
        return Response({'auth_server': self.send_email()})

    def send_email(self):
        # See snippet on github about sending email
        # Use that once we are on SDSC cloud. For now, just return a number

        return 123
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
    authentication_classes = [TokenAuthentication]

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
        serializer =AuthUserSerializer(request.user)

        return Response(serializer.data)
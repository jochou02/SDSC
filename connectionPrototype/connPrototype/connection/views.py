import string

from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views import View

from rest_framework.authentication import TokenAuthentication

from .models import ConnUser
from .models import PendingMatching, FinalizedMatching

from rest_framework.views import APIView
from rest_framework.response import Response

import json

from .serializers import *

from .LISTS import *

# Placeholder before we have a real matching algo
import random

'''
    Tons of room for optimization, but will do for now.
'''


'''
    GET: Fetches all Matching that has been sent out.
'''
class MatchingSentView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        matching_sent = (get_pending_matching(request, request.user.id))[0]

        # In case only single is returned
        if not isinstance(matching_sent, list):
            matching_sent = [matching_sent]

        serializer = ConnUserSerializer(matching_sent, many=True)

        return Response(serializer.data)


'''
    GET: Fetches all Matching that has been received.
'''
class MatchingReceivedView(APIView):
    def get(self, request):
        matching_received = (get_pending_matching(request, request.user.id))[1]

        # In case only single is returned
        if not isinstance(matching_received, list):
            matching_received = [matching_received]

        serializer = ConnUserSerializer(matching_received, many=True)

        return Response(serializer.data)


'''
    GET: Fetches all Matching that has been sent out.
    POST: Sends out a request for the matching generated
'''
class GenerateMatchingView(APIView):
    authentication_classes = [TokenAuthentication]
    # If front end makes a GET request to url associated to generate_match,
    # the func below executes
    def get(self, request):
        # Make sure the match is not the user itself
        temp = generate_match()
        while(temp.id == request.user.id):
            temp = generate_match()

        # Send the information about the match back to the front end
        serializer = ConnUserSerializer(temp, many = False)
        return Response(serializer.data)

    # If front end makes a POST request to url associated to generate_match,
    # the func below executes
    def post(self, request):
        print(request.user)


        # Extract
        request_content = json.loads(request.body.decode("utf-8"))

        # Create a new PendingMatching object, where the sender and receivers are as specified by our input
        m = PendingMatching(id_sender=request.user.id,
                            id_receiver=request_content['id_receiver'])

        # Insert the new PendingMatching object into database by calling .save()
        m.save()

        # Dummy response, will change to other things depending on what front end needs.
        serializer = ConnUserSerializer(ConnUser.objects.all()[0], many=False)
        return Response(serializer.data)


'''
    GET: Fetches all Matching that has been finalized.
'''
class MatchingFinalized(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        request_content = json.loads(request.body.decode("utf-8"))
        finalized_matching = []

        temp = FinalizedMatching.objects.filter(id_user_1=request.user.id)

        # our user is either user_1 or user_2, so we go through both lists
        for i in temp:
            finalized_matching.append(ConnUser.objects.get(pk=i.id_user_2))

        temp = FinalizedMatching.objects.filter(id_user_2=request.user.id)
        for i in temp:
            finalized_matching.append(ConnUser.objects.get(pk=i.id_user_1))

        serializer = FinalizedMatchingSerializer(finalized_matching, many=True)

        return Response(serializer.data)



'''
    POST: Modify a pending matching by either:
        1. Accepting it and pushing it to the finalized table (mode: 'y')
        2. Denying it and marking it as denied (mode: 'n')
        3. Pulling it back / removing it at the user's discretion e.g. already denied (mode: 'd')
'''
class ModifyPending(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        request_content = json.loads(request.body.decode("utf-8"))

        # If yes, push the matching into finalized matching
        # Only receiver could make this call, so request.user.id = id_receiver
        if(request_content['mode'] == 'y'):
            FinalizedMatching(id_user_1=request_content['id_sender'],
                              id_user_2=request.user.id).save()

            PendingMatching.objects.get(id_sender=request_content['id_sender'],
                                        id_receiver=request.user.id).delete()

        # If no, mark as denied. Only show to sender.
        # Only receiver could make this call, so request.user.id = id_receiver
        elif(request_content['mode'] == 'n'):
            p = PendingMatching.objects.get(id_sender=request_content['id_sender'],
                                            id_receiver=request.user.id)
            p.isDenied = True
            p.save()

        # Should we allow people to pullback pending matching?
        # Assuming we do, then this is visible to both sender and receiver
        # So we need to determine what request.user.id is.
        elif(request_content['mode'] == 'd'):
            # Let front end supply only one id, and we can guess the other
            if (request_content['id_sender']):
                PendingMatching.objects.get(id_sender=request_content['id_sender'],
                                            id_receiver=request.user.id).delete()
            else:
                PendingMatching.objects.get(id_sender=request.user.id,
                                            id_receiver=request_content['id_receiver']).delete()

        return Response({})



# Placeholder before we have a real matching algo
# TODO: Conditions for matching
def generate_match():
    tot_users = ConnUser.objects.all().count()
    matched_user_pos = random.randint(0, tot_users - 1)

    return (ConnUser.objects.all()[matched_user_pos: matched_user_pos + 1])[0]


### Ignore everything below


# Send out a matching to another user. Ensures no duplications
def insert_pending_matching(request):
    # So no duplicates are added when user refreshes after sending a match request
    if (not PendingMatching.objects.filter(id_sender=request.user.id,
                                            id_receiver=request.POST['request_match'])):
        m = PendingMatching(id_sender=request.user.id,
                             id_receiver=request.POST['request_match'])

        m.save()


# Pushes a pending matching into the finalized matching table.
# Since there are no duplications in pending matching, there
# would be no duplications in the finalized matching.

# TODO: Delete from pending matching upon acceptation
def insert_finalized_matching(request):
    user_1_id = request.user.id

    for i in request.POST.getlist('match_id'):
        m = FinalizedMatching(id_user_1=user_1_id,
                               id_user_2=int(i))

        m.save()


# Helper function that retrieves all pending matches
# returns tuple of the form (matching_sent, matching_received)
def get_pending_matching(request, u_id):
    matching_sent_id = PendingMatching.objects.filter(id_sender=u_id)
    matching_sent = []
    for i in matching_sent_id:
        matching_sent.append(ConnUser.objects.get(pk=i.id_receiver))

    matching_received_id = PendingMatching.objects.filter(id_receiver=u_id)
    matching_received = []
    for i in matching_received_id:
        matching_received.append(ConnUser.objects.get(pk=i.id_sender))

    return matching_sent, matching_received



'''
    Helper that generates either:
    1. Fake courses
    2. Fake auth_user
    3. or Fake ConnUser
    
    For testing purposes before their respective UIs are up online.
'''
def generate_props(request):
    #   Courses

    # a = [i for i in range(1, 100)]
    #
    # cd = random.choices(DEPT_LIST, k=10)
    #
    # cn = random.choices(a, k=10)
    #
    # for i in range(10):
    #    c =  Course(course_dept = cd[i][0], course_num = cn[i], course_description = "Fake Course For Testing Only")
    #    c.save()
    #    print(c)
    #

    #   auth_user (u_id 13 - 38)

    # usernames = string.ascii_lowercase
    # lastnames = string.ascii_lowercase
    #
    # firstnames = ['Alice', 'Bob', 'Eve', 'Trent', 'Mallory', 'John', 'Tan', 'Caleb',
    #               'Andrew', 'Emily', 'Evelyn', 'Jiting', 'Keystone', 'Corona', 'BudLight',
    #               'Kirin', 'Sapporo', 'Ebisu', 'Shifu', 'Tigress', 'Mantis', 'PandaHimself', 'Monkey',
    #               'Crane', 'Viper', 'Oogway']
    #
    # pword = "abc"
    #
    # for i in range(26):
    #     temp = User.objects.create_user(username=usernames[i], password=pword)
    #     temp.email = usernames[i] + "@ucsd.edu"
    #     temp.first_name = firstnames[i]
    #     temp.last_name = lastnames[i]
    #     temp.save()

    #   ConnUser (u_id 13 - 38)

    c = list(Course.objects.all())

    for i in range(13, 39):
        temp = ConnUser(id = i)
        temp.user_major = random.choice(MAJOR_LIST)[0]
        temp.user_college = random.choice(COLLEGE_LIST)[0]

        interests = random.choices(INTEREST_LIST, k=3)

        temp.user_interest1 = interests[0][0]
        temp.user_interest2 = interests[1][0]
        temp.user_interest3 = interests[2][0]

        temp.save()

        courses = random.choices(c, k=3)
        for j in courses:
            temp.user_courses.add(j)

        temp.save()

    return HttpResponse("Done")
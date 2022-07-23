from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views import View

from rest_framework.authentication import TokenAuthentication

from .models import ConnUser
from .models import User_info_form
from .models import PendingMatching, FinalizedMatching

from rest_framework.views import APIView
from rest_framework.response import Response

import json

from .serializers import *

# Placeholder before we have a real matching algo
import random

'''
    Tons of room for optimization, but will do for now.
'''


# Render the connection home page, or redirect to login.
# Ignore, to be deleted
def show_profile(request):
    pending_matching = get_pending_matching(request)

    if (request.user.is_authenticated):
        cur_user = ConnUser.objects.get(pk=request.user.id)
        return render(request, 'connection/user_profile.html', {'cur_user': cur_user,
                                                                'matching_sent': pending_matching[0],
                                                                'matching_received': pending_matching[1],
                                                                'matching_finalized': get_finalized_matching(request)})
    else:
        return HttpResponseRedirect("account/login.html")


'''
    GET: Fetches all Matching that has been sent out.
'''
class MatchingSentView(APIView):
    def get(self, request, u_id):
        matching_sent = (get_pending_matching(request, u_id))[0]

        # In case only single is returned
        if not isinstance(matching_sent, list):
            matching_sent = [matching_sent]

        serializer = ConnUserSerializer(matching_sent, many=True)

        return Response(serializer.data)


'''
    GET: Fetches all Matching that has been received.
'''
class MatchingReceivedView(APIView):
    def get(self, request, u_id):
        matching_received = (get_pending_matching(request, u_id))[1]

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
    def get(self, request, u_id):
        # Make sure the match is not the user itself
        temp = generate_match()
        while(temp.id == u_id):
            temp = generate_match()

        # Send the information about the match back to the front end
        serializer = ConnUserSerializer(temp, many = False)
        return Response(serializer.data)

    # If front end makes a POST request to url associated to generate_match,
    # the func below executes
    def post(self, request, u_id):
        print(request.user)


        # Extract
        request_content = json.loads(request.body.decode("utf-8"))

        # Create a new PendingMatching object, where the sender and receivers are as specified by our input
        m = PendingMatching(id_sender=u_id,
                            id_receiver=request_content['id_receiver'])

        # Insert the new PendingMatching object into database by calling .save()
        m.save()

        # Dummy response, will change to other things depending on what front end needs.
        serializer = ConnUserSerializer(ConnUser.objects.all()[0], many=False)
        return Response(serializer.data)


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


# Helper function that retrieves user's all completed matching
def get_finalized_matching(request):
    finalized_matching = []
    temp = FinalizedMatching.objects.filter(id_user_1=request.user.id)
    for i in temp:
        finalized_matching.append(ConnUser.objects.get(pk=i.id_user_2))

    temp = FinalizedMatching.objects.filter(id_user_2=request.user.id)
    for i in temp:
        finalized_matching.append(ConnUser.objects.get(pk=i.id_user_1))

    return finalized_matching


# TODO: Get this stuff working
def get_info(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = User_info_form(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            data = form.cleaned_data

            print(request.user.id)
            for i in data.keys():
                print(data[i])

            return HttpResponse("Success")

    # if a GET (or any other method) we'll create a blank form
    else:
        form = User_info_form()

    return render(request, 'connection/get_info.html', {'form': form})

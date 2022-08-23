from django.shortcuts import render

# Create your views here.
import requests
import pprint
import ujson

import time
import pytz
import zlib

from icalendar import Calendar, Event
from datetime import datetime

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Schedule

from rest_framework.authentication import TokenAuthentication


def dump_cal(cal):
    toReturn = []

    for component in cal.walk():
        temp = {}
        if (component.name == 'VEVENT'):
            temp['event'] = component.get('summary')
            temp['description'] = component.get('description')
            temp['uid'] = component.get('uid')

            # need to use .dt to convert it to human readable datatime.
            # so be careful in case certain entry doesnt exist
            # note that the time is in zulu time
            if component.get('dtstart'):
                temp['dtstart'] = component.get('dtstart').dt

            if component.get('dtend'):
                temp['dtend'] = component.get('dtend').dt

            if component.get('dtstamp'):
                temp['dtstamp'] = component.get('dtstamp').dt

            toReturn.append(temp)

    return toReturn


# Front end supplies a link to user's Canvas ical feed. We load it, and store it in database
class UploadScheduleView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        #request_content = ujson.loads(request.body.decode("utf-8"))
        #print("request_content")
        #print(request_content)

        #user_ical_link = request_content.get('ical_link')
        #print("user_ical_link")
        #print(user_ical_link)

        #cal = requests.get(user_ical_link).content.decode()
        #print("cal")
        #print(cal);

        cal = requests.get("https://canvas.ucsd.edu/feeds/calendars/user_a1YvJ7LIcGvB7NnkUpxOWFCvaZjqpnp3KQftmIwI.ics").content.decode()
        #cal = requests.get(user_ical_link).content.decode()
        print(cal);

        # For testing only
        # Use request.user.id
        temp = Schedule.objects.get(pk=1)
        temp.content = cal
        temp.save()

        return Response({})


# Fetch from database and push to the front-end.
# returns a list of calendars, where each element of the list is a dict representing an event
class FetchScheduleView(APIView):
    authentication_class = [TokenAuthentication]

    def get(self, request):
        # For testing only
        schedule = Schedule.objects.get(pk=1)

        return Response(dump_cal(Calendar.from_ical(schedule.content)))


# Front-end supplies details about an event, we crete an event using those details, and push it into user's
# schedule in database.
# Returns the updated schedule to front-end
class AddEventView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        schedule = Schedule.objects.get(pk=1)
        cal = Calendar.from_ical(schedule.content)

        # request_content = ujson.loads(request.body.decode("utf-8"))

        e = Event()

        # e.add('summary', request_content['summary'])
        # e.add('description', request_content['description'])

        # And we need to figure out a scheme to generate event id (could hash the time stamp)
        time_now = datetime.utcnow().replace(microsecond=0)

        # For testing only. Use time stamp for event id
        e.add('uid', '123')
        #e.add('uid', f'event_{str(time_now)}')
        # Note server time is zulu time
        # e.add('dtstart', datetime(request_content['year'], request_content['month'], request_content['day'],
        #                           request_content['hour'], request_content['minute'], request_content['second'], tzinfo=pytz.utc))
        e.add('dtstamp', time_now)

        cal.add_component(e)

        schedule.content = cal.to_ical().decode()
        schedule.save()

        return Response(dump_cal(cal))


# TODO: Work on this one. Specifically, edit and deletion. Need to figure out an efficient way to update.
class UpdateScheduleView(APIView):
    authentication_class = [TokenAuthentication]

    def post(self, request):
        #For testing only
        request_content = ujson.loads(request.body.decode("utf-8"))

        cal = Schedule.objects.get(pk=1)

        return Response({})


class DeleteEventView(APIView):
    authentication_class = [TokenAuthentication]

    def post(self, request):
        #For testing only
        #request_content = ujson.loads(request.body.decode("utf-8"))

        #event_id = request_content['uid']
        #replace with your event_id
        event_id = "event-calendar-event-786801"

        #replace with request.user.id
        schedule = Schedule.objects.get(pk=1)
        cal = Calendar.from_ical(schedule.content)

        temp = Calendar()
        for component in cal.walk():
            # Seems like if you keep the same header, it would cause issue, so only saving VEVENT
            if component.name == 'VEVENT' and not (component.get('uid') == event_id):
                temp.add_component(component)

        schedule.content = temp.to_ical().decode()
        schedule.save()

        return Response(dump_cal(temp))

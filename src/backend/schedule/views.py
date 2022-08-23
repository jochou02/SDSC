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
            temp['event_id'] = component.get('uid')

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


class UploadScheduleView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # request_content = ujson.loads(request.body.decode("utf-8"))
        # user_ical_link = request_content(['ical_link'])

        cal = requests.get("https://canvas.ucsd.edu/feeds/calendars/user_a1YvJ7LIcGvB7NnkUpxOWFCvaZjqpnp3KQftmIwI.ics").content.decode()

        # For testing only
        temp = Schedule.objects.get(pk=1)
        temp.content = cal
        temp.save()

        return Response({})


# returns a list
class FetchScheduleView(APIView):
    authentication_class = [TokenAuthentication]

    def get(self, request):
        # For testing only
        schedule = Schedule.objects.get(pk=1)

        return Response(dump_cal(Calendar.from_ical(schedule.content)))


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

        e.add('uid', f'event_{str(time_now)}')
        # Note server time is zulu time
        # e.add('dtstart', datetime(request_content['year'], request_content['month'], request_content['day'],
        #                           request_content['hour'], request_content['minute'], request_content['second'], tzinfo=pytz.utc))
        e.add('dtstamp', time_now)

        cal.add_component(e)

        schedule.content = cal.to_ical()
        schedule.save()

        return Response(dump_cal(cal))


class UpdateScheduleView(APIView):
    authentication_class = [TokenAuthentication]

    def post(self, request):
        #For testing only
        request_content = ujson.loads(request.body.decode("utf-8"))

        cal = Schedule.objects.get(pk=1)

        return Response({})

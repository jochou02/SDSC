from socket import timeout
import tkinter
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
#from tkinter import Tk
#from tkinter.filedialog import askopenfilename
import os

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Schedule

from rest_framework.authentication import TokenAuthentication

from ics import Calendar as icsCal, Event

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
                dtstart = component.get('dtstart').dt
                temp['dtstart_year'] = dtstart.year
                temp['dtstart_month'] = dtstart.month
                temp['dtstart_day'] = dtstart.day

                try:
                    temp['dtstart_hour'] = dtstart.hour
                    temp['dtstart_minute'] = dtstart.minute
                    temp['dtstart_second'] = dtstart.second
                except:
                    temp['dtstart_hour'] = 12
                    temp['dtstart_minute'] = 0
                    temp['dtstart_second'] = 0

            if component.get('dtend'):
                dtend = component.get('dtend').dt
                temp['dtend_year'] = dtend.year
                temp['dtend_month'] = dtend.month
                temp['dtend_day'] = dtend.day

                try:
                    temp['dtend_hour'] = dtend.hour
                    temp['dtend_minute'] = dtend.minute
                    temp['dtend_second'] = dtend.second
                except:
                    temp['dtend_hour'] = 12
                    temp['dtend_minute'] = 0
                    temp['dtend_second'] = 0

            # Not sure if this would be of any use to the front-end
            if component.get('dtstamp'):
                temp['dtstamp'] = component.get('dtstamp').dt

            toReturn.append(temp)

    return toReturn


# Front end supplies a link to user's Canvas ical feed. We load it, and store it in database
class UploadScheduleView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):

        request_content = ujson.loads(request.body.decode("utf-8"))

        #print("request_content")
        #print(request_content)

        user_ical_link = request_content.get('ical_link')
        #print("user_ical_link")
        #print(user_ical_link)

        cal = requests.get(user_ical_link).content.decode()
        #print("cal")
        #print(cal);

        try: 
            temp = Schedule.objects.get(pk=request.user.id)
        except:
            print("except")
            temp = Schedule.objects.create(pk=request.user.id)

        temp.content = cal
        #print(temp.content)
        temp.save()

        return Response({})


# Fetch from database and push to the front-end.
# returns a list of calendars, where each element of the list is a dict representing an event
class FetchScheduleView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        #print("request.user")
        #print(request.user.id)

        try:
            print("try")
            schedule = Schedule.objects.get(pk=request.user.id)
            #print("schedule")
            #print(schedule)
        except:
            print("except")
            temp = Schedule.objects.create(pk=request.user.id)
            temp.content = {}
            temp.save()
            return Response({})

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

        event_id = request_content['uid']


        schedule = Schedule.objects.get(pk=1)
        cal = Calendar.from_ical(schedule.content)

        for component in cal.walk():
            if (component.name == 'VEVENT' and component.get('uid') == event_id):
                if request_content['description']:
                    component['description'] = request_content['description']

                if request_content['summary']:
                    component['summary'] = request_content['summary']

                if request_content['hour_start']:
                    new_dt_start = datetime.date()

        schedule.content = cal.to_ical().decode()
        schedule.save()

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


class ExportScheduleView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        request_content = ujson.loads(request.body.decode("utf-8"))

        cal = request_content['cal']
        #print(cal)

        c = icsCal()

        for event in cal:
            e = Event()
            e.name = event.get('event')

            def adjustedTime(time):
                if (time == 0):
                    return '00'
                else:
                    return str(time)

            dateStartStr = ''
            dateStartStr = (
            str(event.get('dtstart_year')) + "/" +
            str(event.get('dtstart_month')) + "/" +
            str(event.get('dtstart_day')) + " " +
            adjustedTime(event.get('dtstart_hour')) + ":" + 
            adjustedTime(event.get('dtstart_minute')))

            dateEndStr = ''
            dateEndStr = (
            str(event.get('dtend_year')) + "/" +
            str(event.get('dtend_month')) + "/" +
            str(event.get('dtend_day')) + " " +
            adjustedTime(event.get('dtend_hour')) + ":" + 
            adjustedTime(event.get('dtend_minute')))

            #print("Start: " + dateStartStr + ", End: " + dateEndStr)

            e.begin = dateStartStr
            e.end = dateEndStr
            
            c.events.add(e)

        #root = tkinter.Tk();
        #root.withdraw();
        #filename = askopenfilename()

        #I couldn't get a file browser to work so just save to desktop

        message = ''

        try: 
            path = os.path.join(os.path.expanduser('~'), 'Desktop', 'Calendar.ics')

            with open(path, 'w') as export_file:
                export_file.writelines(c.serialize_iter())

            message = "The iCal export has been saved to your desktop"
        except:
            message = "There was an error in exporting"

        return Response(message)
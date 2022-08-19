import requests
import pprint
import ujson

import time
import pytz
import zlib

from icalendar import Calendar, Event
from datetime import datetime

#=======================#
# Accessing and Parsing #
#=======================#

def dump_cal(cal):
    for component in cal.walk():
        if (component.name == 'VEVENT'):
            print("Event:", component.get('summary'))
            print("Description:", component.get('description'))
            print("UID:", component.get('uid'))

            # need to use .dt to convert it to human readable datatime.
            # so be careful in case certain entry doesnt exist
            # note that the time is in zulu time
            if component.get('dtstart'):
                print("Start time:", component.get('dtstart').dt)
                
            if component.get('dtend'):
                print("End time:", component.get('dtend').dt)

            if component.get('dtstamp'):
                print("Time stamp:", component.get('dtstamp').dt)

            print("=====")

    # Some space between outputs
    for i in range(5):
        print()


# Get ical feed from the Canvas API endpoint below
ical_feed = requests.get("https://canvas.ucsd.edu/feeds/calendars/user_a1YvJ7LIcGvB7NnkUpxOWFCvaZjqpnp3KQftmIwI.ics")
# Load the feed
cal = Calendar.from_ical(ical_feed.content)

# cat.walk() gives us a list representation of the parsed ical feed
# Notice the cal.walk()[0] is likely always an overview
# And it seems that for each cal.walk()[i] s.t. i in [1, len(cal.walk())], it gives you the ith event.
p = pprint.PrettyPrinter(indent = 4)
p.pprint(cal.walk()[1])

# Notice cal.walk() is a list
print(type(cal.walk()))
print(len(cal.walk()))

# Walking through the ical feed, printing out each event's properties
# Note events are sorted by the order of start time

print("====Before Adding New Event====")
dump_cal(cal)


#==============================#
# Adding, Editing and Removing #
#==============================#

e = Event()

e.add('summary', 'demo event')
e.add('description', 'event added by demo script')

# We use student's user id to create a unique id for events
# Suppose student has id of 12.
student_id = '12'

# And we need to figure out a scheme to generate event id (could hash the time stamp)
event_id = '1024abc'

e.add('uid', f'student_{student_id}_event_{event_id}')
# Note server time is zulu time
e.add('dtstart', datetime(2022, 9, 1, 0, 0, 0, tzinfo=pytz.utc))
e.add('dtstamp', datetime.utcnow().replace(microsecond=0))

cal.add_component(e)

print("====After Adding New Event====")
dump_cal(cal)


# To edit just enumerate through and set the desired property to desired value
for component in cal.walk():
    if (component.name == 'VEVENT' and component.get('uid') == f'student_{student_id}_event_{event_id}'):
        component['description'] = 'This description has been updated'

print("====After Editing New Event====")
dump_cal(cal)


# As it seems, I did not see any mention of deleting an event. A naive approach would be to simply create a new calendar
temp = Calendar()
for component in cal.walk():
    # Seems like if you keep the same header, it would cause issue, so only saving VEVENT
    if component.name == 'VEVENT' and not(component.get('uid') == f'student_{student_id}_event_{event_id}'):
        temp.add_component(component)

cal = temp

print("====After Removing New Event====")
dump_cal(temp)


#==================#
# Storage Solution #
#==================#

# Nothing wrong with simply saving it as string. Compress to save space

print("====Store====")
store = zlib.compress(cal.to_ical())
# Quite effective. For reference, without compression the length is about 1500
print(len(store))
print()
print(store)

print("====Load Stored .ical====")
dump_cal(Calendar.from_ical(zlib.decompress(store)))
















from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from rest_framework.response import Response
import redis
import ujson
import pprint

def index(request):
    return HttpResponse("Hello, world. You're at the wait time index.")

class wait_time_data(View):
    def get(self, request):
        r = redis.StrictRedis(host="132.249.242.203", port=6379, db=0, password='kungfurubberducky2022')
        for key in r.scan_iter():
            if (key != None and 'wait'.encode() in key):
                print(key, r.get(key))
                print("")
        print("-=-=-=-=-=-=-")
        a = r.get('CSE 100')
        a = ujson.loads(a)
        print(type(a), a)
        print(a['AvgApproval'])
        print("****")
        b = ujson.loads(r.get('wait_7'))
        p = pprint.PrettyPrinter(indent = 4)
        p.pprint(b)
        print("Location: " + b['name'])
        print("")
        return HttpResponse("Pulling data from redis...")

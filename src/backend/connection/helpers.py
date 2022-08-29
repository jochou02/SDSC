from api.serializers import StudentSerializer
from account.models import Student

from django.apps import apps

import ujson
import redis

import base64, io

def redis_get_student(r, pipe, id):
    try:
        student = ujson.loads(r.get(f"student_{id}"))
    except:
        student = StudentSerializer(Student.objects.get(pk=id)).data
        pipe.set(f"student_{id}", ujson.dumps(student))

    return student

def redis_set_student(r, id, temp):
    #Idk why below isn't working but w/ temp it works so
    #student = StudentSerializer(temp).data
    r.set(f"student_{id}", ujson.dumps(temp))

    return temp

def get_pfp(id):
    pfp = StudentSerializer(Student.objects.get(pk=id)).data.get('profile_pic')

    return pfp




    


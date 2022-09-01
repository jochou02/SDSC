from account.models import *
from .models import *
from api.serializers import *

from django.apps import apps

import ujson
import redis

def get_course_name(course_id):
    course = Course.objects.get(id=course_id)
    
    course_name = (course.course_dept + " " + str(course.course_num))

    return course_name



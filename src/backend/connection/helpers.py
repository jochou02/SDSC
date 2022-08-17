from api.serializers import StudentSerializer
from account.models import Student

from django.apps import apps
userModel = apps.get_model('account', 'Student')

import ujson
import redis

def redis_get_student(r, id):
    if (not r.exists(f"student_{id}")):
        student = StudentSerializer(Student.objects.get(pk=id)).data
        r.set(f"student_{id}", ujson.dumps(student))
    else:
        student = ujson.loads(r.get(f"student_{id}"))

    return student
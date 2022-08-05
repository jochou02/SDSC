from account.serializers import StudentSerializer
from account.models import Student

from django.apps import apps
userModel = apps.get_model('account', 'Student')

def conn_wrapper(auth_user, conn_user):
    toRespond = Student(conn_user).data
    toRespond.update({'first_name': auth_user.first_name,
                      'last_name': auth_user.last_name,
                      'email': auth_user.email})

    return toRespond
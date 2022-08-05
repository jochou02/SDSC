from .models import ConnUser
from .serializers import ConnUserSerializer


def conn_wrapper(auth_user, conn_user):
    toRespond = ConnUserSerializer(conn_user).data
    toRespond.update({
        'first_name': auth_user.first_name,
        'last_name': auth_user.last_name,
        'email': auth_user.email,})

    return toRespond
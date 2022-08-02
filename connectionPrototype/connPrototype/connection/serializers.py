from rest_framework import serializers
from .models import ConnUser, PendingMatching, FinalizedMatching, Course

class ConnUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnUser
        fields = ['id', 'user_college', 'user_major', 'user_interest1',
                  'user_interest2', 'user_interest3', 'user_courses']


class PendingMatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingMatching
        fields = ['id_sender', 'id_receiver', 'isDenied']


class FinalizedMatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalizedMatching
        fields = ['id_user_1', 'id_user_2']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['course_dept', 'course_num', 'course_description']
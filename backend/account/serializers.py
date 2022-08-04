from django.contrib.auth.models import User
from .models import Student
from rest_framework import serializers


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'user_college', 'user_major', 'user_interest1',
                  'user_interest2', 'user_interest3', 'current_courses', 'past_courses', 'tutoring_courses']


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
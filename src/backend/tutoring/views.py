from api.serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from account.models import *
from account.LISTS import *
from .models import *
import json
from django.core.serializers.json import DjangoJSONEncoder

# API

class GetCoursesSample(APIView):

    def get(self, request):
        student = Student.objects.get(pk=1)
        queryset = student.current_courses.all()
        serializer = CourseSerializer(queryset, many=True)
        data = serializer.data
        return Response(data)

class GetCurrentCourses(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        if (request.user.is_authenticated):
            student = Student.objects.get(pk=request.user.id)
            queryset = student.current_courses.all()
            serializer = CourseSerializer(queryset, many=True)
            data = serializer.data
            return Response(data)

        else:
            return Response({})

class GetPastCourses(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        if (request.user.is_authenticated):
            student = Student.objects.get(pk=request.user.id)
            queryset = student.past_courses.all()
            serializer = CourseSerializer(queryset, many=True)
            data = serializer.data
            return Response(data)

        else:
            return Response({})

class GetTutoringCourses(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        if (request.user.is_authenticated):
            student = Student.objects.get(pk=request.user.id)
            queryset = student.tutoring_courses.all()
            serializer = CourseSerializer(queryset, many=True)
            data = serializer.data
            return Response(data)

        else:
            return Response({})

class FindPeer(APIView):

    def get(self, request, pk1, pk2):
        course = Course.objects.get(course_dept=pk1, course_num=pk2)
        queryset = Student.objects.filter(current_courses__in=[course])
        serializer = StudentSerializer(queryset, many=True)
        data = serializer.data
        return Response(data)


class FindTutor(APIView):

    def get(self, request, pk1, pk2):
        course = Course.objects.get(course_dept=pk1, course_num=pk2)
        queryset = Student.objects.filter(tutoring_courses__in=[course])
        serializer = StudentSerializer(queryset, many=True)
        data = serializer.data
        return Response(data)



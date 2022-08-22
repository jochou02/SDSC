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

# TESTING ONLY #

class GetCoursesSample(APIView):

    def get(self, request):
        student = Student.objects.get(pk=1)

        queryset1 = student.current_courses.all()
        serializer1 = CourseSerializer(queryset1, many=True)
        data1 = serializer1.data

        queryset2 = student.past_courses.all()
        serializer2 = CourseSerializer(queryset2, many=True)
        data2 = serializer2.data

        queryset3 = student.past_courses.all()
        serializer3 = CourseSerializer(queryset3, many=True)
        data3 = serializer3.data

        return Response({
            'current_courses': data1, 
            'past_courses': data2,
            'tutoring_courses': data3
        })

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

# END TESTING SECTION #

class GetAllCourses(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        if (request.user.is_authenticated):
            student = Student.objects.get(pk=request.user.id)

            queryset1 = student.current_courses.all()
            serializer1 = CourseSerializer(queryset1, many=True)
            data1 = serializer1.data

            queryset2 = student.past_courses.all()
            serializer2 = CourseSerializer(queryset2, many=True)
            data2 = serializer2.data

            queryset3 = student.past_courses.all()
            serializer3 = CourseSerializer(queryset3, many=True)
            data3 = serializer3.data

            return Response({
                'current_courses': data1, 
                'past_courses': data2,
                'tutoring_courses': data3
            })

        else:
            return Response({})

def removeCurrentCourse(request, pk):
    request.user.student.current_courses.remove(Course.objects.get(id=pk))

def removePastCourse(request, pk):
    request.user.student.past_courses.remove(Course.objects.get(id=pk))

def removeTutoringCourse(request, pk):
    request.user.student.tutoring_courses.remove(Course.objects.get(id=pk))
    request.user.student.past_courses.add(Course.objects.get(id=pk))

def markComplete(request, pk):
    updated_course = Course.objects.get(id=pk)
    request.user.student.current_courses.remove(updated_course)
    request.user.student.past_courses.add(updated_course)

def markCurrent(request, pk):
    updated_course = Course.objects.get(id=pk)
    request.user.student.past_courses.remove(updated_course)
    request.user.student.current_courses.add(updated_course)

def becomeTutor(request, pk):
    course = Course.objects.get(id=pk)
    request.user.student.past_courses.remove(course)
    request.user.student.tutoring_courses.add(course)

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



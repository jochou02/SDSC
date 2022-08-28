from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from account.models import *
from .models import *
from api.serializers import *

import redis
import ujson

# Create your views here.

class GetReviews(APIView):
    authentication_classes = [TokenAuthentication]

    #add pk1 and pk2 back to parameter
    def get(self, request):
        if (request.user.is_authenticated):
            course = Course.objects.get(course_dept="CSE", course_num="100")

            queryset = course.review_set.all()

            serializer = ReviewSerializer(queryset, many=True)
            data = serializer.data
            return Response(data)


class GetCourseData(APIView):

    def post(self, request):
        request_content = ujson.loads(request.body.decode("utf-8"))
        course_name = request_content['course_name']

        r = redis.StrictRedis(host="132.249.242.203", port=6379, db=0, password='kungfurubberducky2022')

        # print(r.get('CSE 100'))

        return Response(ujson.loads(r.get(course_name)))


class GetCourseDataTest(APIView):

    def post(self, request):
        r = redis.StrictRedis(host="132.249.242.203", port=6379, db=0, password='kungfurubberducky2022')

        # print(r.get('CSE 100'))

        return Response(ujson.loads(r.get('CSE 100')))
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from account.models import *
from .models import *
from api.serializers import *
from .helpers import get_course_name

import redis
import ujson

# Create your views here.

class GetCourseData(APIView):

    def post(self, request):
        request_content = ujson.loads(request.body.decode("utf-8"))

        course_dept = request_content.get('course_dept')
        course_num = request_content.get('course_num')

        r = redis.StrictRedis(host="132.249.242.203", port=6379, db=0, password='kungfurubberducky2022')

        #print((course_dept + " " + course_num))

        data = ujson.loads(r.get(course_dept + " " + course_num))

        return Response(data)

class GetReviews(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        #print(request.user.is_authenticated)
        if (request.user.is_authenticated):
            r = redis.StrictRedis(host="132.249.242.203", port=6379, db=0, password='kungfurubberducky2022')

            request_content = ujson.loads(request.body)

            course_dept = request_content.get('course_dept')
            course_num = request_content.get('course_num')

            course = Course.objects.get(course_dept=course_dept, course_num=course_num)

            queryset = course.review_set.all()

            serializer = ReviewSerializer(queryset, many=True)
            data = serializer.data

            return Response(data)


class SetReviews(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        request_content = ujson.loads(request.body)
        print(request_content)

        #Open connection to Redis
        r = redis.StrictRedis(
            host="132.249.242.203", port=6379, db=0, password='kungfurubberducky2022')
        pipe = r.pipeline()

        tempCourse = Course.objects.get(course_dept=request_content.get('course_dept'),course_num=request_content.get('course_num'))

        temp = Review.objects.create(course_id=tempCourse.id, student_id=request.user.id);

        temp.description = request_content.get('description');

        #For some reason the migration was getting stuck so can't migrate -> this doesn't work
        #temp.prof = request_content.get('prof')

        #TO-DO: Require rating so this doesn't occur, since rating = 0 shows up as blank box in Reviews page
        if (request_content.get('rating') == ''):
            temp.rating = 0
        else:
            temp.rating = request_content.get('rating');

        temp.save();

        return Response({})
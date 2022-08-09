from api.serializers import *
from rest_framework import viewsets


# API

class CurrentCourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    def get_queryset(self):
        student = self.request.user.student
        return student.current_courses.all()

class CompletedCourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    def get_queryset(self):
        student = self.request.user.student
        return student.past_courses.all()

class TutoringCourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    def get_queryset(self):
        student = self.request.user.student
        return student.tutoring_courses.all()
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Course(models.Model):

    DEPT_LIST = [('CSE', 'CSE'), ('MATH', 'MATH'), 
        ('COGS', 'COGS'), ('POLI', 'POLI'), ('CHEM', 'CHEM')]

    course_dept = models.CharField(max_length=10, choices=DEPT_LIST)
    course_num = models.CharField(max_length=200, null=True)
    prof = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f'{self.course_dept} {self.course_num} ({self.prof})'

class Student(models.Model):

    student_user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)

    # Basic user information
    fname = models.CharField(max_length=200, null=True)
    lname = models.CharField(max_length=200, null=True)

    # User contact info
    phone = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    
    # 3 categories of user's classes
    current_courses = models.ManyToManyField(Course, related_name='current_courses_set', blank=True)
    past_courses = models.ManyToManyField(Course, related_name='past_courses_set', blank=True)
    tutoring_courses = models.ManyToManyField(Course, related_name='tutoring_courses_set', blank=True)

    def __str__(self):
        return f'{self.fname} {self.lname}'

import datetime

from django.db import models
from django import forms

from .LISTS import *

# Makes no sense to keep this in connection. More of a tutoring thing.
# To be deleted once tutoring is up.
class Course(models.Model):
    # For prototyping purpose only
    course_dept = models.CharField(max_length=10, choices=DEPT_LIST)

    course_num = models.IntegerField()
    course_description = models.TextField()

    def __str__(self):
        return (self.course_dept + " " + str(self.course_num))


# Convert to John's model where interests are their own tables
class ConnUser(models.Model):
    user_college = models.CharField(max_length=10, choices=COLLEGE_LIST)

    user_major = models.CharField(max_length=25, choices=MAJOR_LIST)

    user_interest1 = models.CharField(max_length=40, choices=INTEREST_LIST)

    user_interest2 = models.CharField(max_length=40, choices=INTEREST_LIST)

    user_interest3 = models.CharField(max_length=40, choices=INTEREST_LIST)

    user_courses = models.ManyToManyField(Course)

    # This is where we set karma
    user_karma = 0


# Stores pending matchings. Once a matching is approved, move to All_matching
class PendingMatching(models.Model):
    id_sender = models.IntegerField()
    id_receiver = models.IntegerField()

    isDenied = models.BooleanField(default=False)

    # Do we need a timestamp?

    def __str__(self):
        return str(self.id_sender) + "-->" + str(self.id_receiver) + " isDenied: " + str(isDenied)


# Stores matchings that have been approved by both parties.
class FinalizedMatching(models.Model):
    id_user_1 = models.IntegerField()
    id_user_2 = models.IntegerField()

    # Do we need a timestamp?

    def __str__(self):
        return str(self.id_user_1) + "--" + str(self.id_user_2)


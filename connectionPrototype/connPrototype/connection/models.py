import datetime

from django.db import models
from django import forms

from .LISTS import *


class Course(models.Model):
    # For prototyping purpose only
    course_dept = models.CharField(max_length=10, choices=DEPT_LIST)

    course_num = models.IntegerField()
    course_description = models.TextField()

    def __str__(self):
        return (self.course_dept + " " + str(self.course_num))


# Create your models here.
class ConnUser(models.Model):
    user_fname = models.CharField(max_length=25)
    user_lname = models.CharField(max_length=25)
    user_college = models.CharField(max_length=10, choices=COLLEGE_LIST)

    user_major = models.CharField(max_length=25, choices=MAJOR_LIST)
    user_interest1 = models.CharField(max_length=40, choices=INTEREST_LIST)
    user_interest2 = models.CharField(max_length=40, choices=INTEREST_LIST)
    user_interest3 = models.CharField(max_length=40, choices=INTEREST_LIST)

    user_courses = models.ManyToManyField(Course)

    def __str__(self):
        to_return = "Name: " + str(self.user_fname) + \
                    " " + str(self.user_lname)

        return to_return


# Stores pending matchings. Once a matching is approved, move to All_matching
class PendingMatching(models.Model):
    id_sender = models.IntegerField()
    id_receiver = models.IntegerField()

    def __str__(self):
        return str(self.id_sender) + "-->" + str(self.id_receiver)


# Stores matchings that have been approved by both parties.
class FinalizedMatching(models.Model):
    id_user_1 = models.IntegerField()
    id_user_2 = models.IntegerField()

    def __str__(self):
        return str(self.id_user_1) + "--" + str(self.id_user_2)


# Rough page for user to update their information
class User_info_form(forms.Form):
    user_fname = forms.CharField(max_length=25)
    user_lname = forms.CharField(max_length=25)
    user_college = forms.ChoiceField(choices=COLLEGE_LIST)

    user_major = forms.ChoiceField(choices=MAJOR_LIST)
    user_interest1 = forms.ChoiceField(choices=INTEREST_LIST)
    user_interest2 = forms.ChoiceField(choices=INTEREST_LIST)
    user_interest3 = forms.ChoiceField(choices=INTEREST_LIST)

    user_courses = forms.ModelMultipleChoiceField(queryset=Course.objects.all(), widget = forms.CheckboxSelectMultiple)

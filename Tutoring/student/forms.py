from django import forms
from django.forms import ModelForm
from .models import Course, Student
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CourseForm(ModelForm):

    course = forms.ModelChoiceField(queryset=Course.objects.all(), required=False, help_text="Course")

    class Meta:
        model = Student
        fields = []

    def save(self, commit=True):
        student = super(CourseForm, self).save(commit=False)
        student.current_courses.add(course)
    
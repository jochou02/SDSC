from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Course(models.Model):

    name = models.CharField(max_length=200, null=True)
    prof = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name

class StudentCourse(models.Model):

    STATUSES = (
        ('Ongoing', 'Ongoing'),
        ('Complete', 'Complete'),
    )  

    course = models.ForeignKey(Course, null=True, on_delete=models.SET_NULL)
    status = models.CharField(max_length=200, null=True, choices=STATUSES)

    def __str__(self):
        return self.name

class Student(models.Model):

    COLLEGES = (
        ('Revelle', 'Revelle'),
        ('Muir', 'Muir'),
        ('Marshall', 'Marshall'),
        ('Warren', 'Warren'),
        ('ERC', 'ERC'),
        ('Sixth', 'Sixth'),
        ('Seventh', 'Seventh'),
    )  

    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    profile_pic = models.ImageField(default="profile1.png",null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    courses = models.ManyToManyField(Course)
    college = models.CharField(max_length=200, null=True, choices=COLLEGES)

    def __str__(self):
        return self.name
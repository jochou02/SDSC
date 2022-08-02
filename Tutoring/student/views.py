from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import Group

# Create your views here.

from django.http import HttpResponse
 
def index(request):

    student = request.user.student

    curr = student.current_courses.all()
    past = student.past_courses.all()
    tut = student.tutoring_courses.all()

    context = {'curr': curr, 'past': past, 'tut': tut, 'student': student}

    return render(request, 'student/index.html', context)

def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'username or password is incorrect')

    return render(request, 'student/login.html')

def addCourse(request):
    user = request.user
    form = CourseForm()
    if request.method == 'POST': 
        form = CourseForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')

    context = {'form': form}

    return render(request, 'student/add_course.html', context)

def removeCurrentCourse(request, pk):
    request.user.student.current_courses.remove(Course.objects.get(id=pk))
    return redirect('/')

def removePastCourse(request, pk):
    request.user.student.past_courses.remove(Course.objects.get(id=pk))
    return redirect('/')

def removeTutoringCourse(request, pk):
    request.user.student.tutoring_courses.remove(Course.objects.get(id=pk))
    request.user.student.past_courses.add(Course.objects.get(id=pk))
    return redirect('/')

def markComplete(request, pk):
    updated_course = Course.objects.get(id=pk)
    request.user.student.current_courses.remove(updated_course)
    request.user.student.past_courses.add(updated_course)
    return redirect('/')

def markCurrent(request, pk):
    updated_course = Course.objects.get(id=pk)
    request.user.student.past_courses.remove(updated_course)
    request.user.student.current_courses.add(updated_course)
    return redirect('/')

def becomeTutor(request, pk):

    course = Course.objects.get(id=pk)
    if request.method == "POST":
        request.user.student.past_courses.remove(course)
        request.user.student.tutoring_courses.add(course)
        return redirect('/')

    context = {'course': course}
    return render(request, 'student/tutoring.html', context)

def findTutor(request, pk):
    course = Course.objects.get(id=pk)
    students = Student.objects.filter(tutoring_courses__in=[course])
    context = {'course': course, 'students': students}
    return render(request, 'student/find_tutors.html', context)

def findPeer(request, pk):
    course = Course.objects.get(id=pk)
    students = Student.objects.filter(current_courses__in=[course])
    context = {'course': course, 'students': students}
    return render(request, 'student/find_peer.html', context)

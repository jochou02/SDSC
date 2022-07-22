from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import Group
from django.http import HttpResponse
from django.shortcuts import render, redirect

from .models import *
from .forms import *
from .decorators import *

@unauthenticated_user
def registerPage(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')

            group = Group.objects.get(name='student')
            user.groups.add(group)
            Student.objects.create(
                user=user
            )

            messages.success(request, 'Account was created for ' + username)

            return redirect('login')

    context = {'form': form}
    return render(request, 'accounts/register.html', context)

@unauthenticated_user
def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'username or password is incorrect')

    context = {}
    return render(request, 'accounts/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
@allowed_users(allowed_roles=['student'])
def accountSettings(request):
    student1 = request.user.student
    form = StudentForm(instance=student1)

    if request.method == 'POST':
        form = StudentForm(request.POST, request.FILES, instance=student1)
        if form.is_valid():
            form.save()

    context ={'form': form}
    return render(request, 'accounts/account_settings.html', context)

@login_required(login_url='login')
@admin_only
def home(request):
    courses = Course.objects.all()
    students = Student.objects.all()

    total_courses = courses.count()
    total_students = students.count()

    context = {'courses': courses, 'students': students, 
    'total_courses': total_courses, 'total_users': total_students}

    return render(request, 'accounts/dashboard.html', context)

@login_required(login_url='login')
@allowed_users(allowed_roles=['student'])
def userPage(request):
    courses = Course.objects.all()

    total_courses = courses.count()

    context = {'courses': courses}
    return render(request, 'accounts/user.html', context)

@login_required(login_url='login')
def student(request, pk):
    student = Student.objects.get(id=pk)

    context = {'student': student}
    return render(request, 'accounts/student.html', context)

@login_required(login_url='login')
@allowed_users(allowed_roles=['admin'])
def courses(request):
    courses = Course.objects.all()

    return render(request, 'accounts/courses.html', {'courses': courses})
from django.urls import path

from . import views
urlpatterns=[
    path('',views.index, name="home"),
    path('login/', views.loginPage),
    path('add_course/', views.addCourse, name="add_course"),
    path('remove_current_course/<str:pk>/', views.removeCurrentCourse, name="remove_current_course"),
    path('remove_past_course/<str:pk>/', views.removePastCourse, name="remove_past_course"),
    path('remove_tutoring_course/<str:pk>/', views.removeTutoringCourse, name="remove_tutoring_course"),

    path('mark_complete/<str:pk>/', views.markComplete, name="mark_complete"),
    path('mark_current/<str:pk>/', views.markCurrent, name="mark_current"),

    path('become_tutor/<str:pk>/', views.becomeTutor, name="become_tutor"),

    path('find_tutor/<str:pk>/', views.findTutor, name="find_tutor"),
    path('find_peer/<str:pk>/', views.findPeer, name="find_peer"),
]
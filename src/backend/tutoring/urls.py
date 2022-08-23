from django.urls import path
from . import views

urlpatterns=[
    # For testing purposes
    path('get_courses_sample/', views.GetCoursesSample.as_view(), name='get_courses_sample'),

    # Also for testing, not needed anymore with addition of get all courses
    path('get_current_courses/', views.GetCurrentCourses.as_view(), name='get_current_courses'),
    path('get_past_courses/', views.GetPastCourses.as_view(), name='get_past_courses'),
    path('get_tutoring_courses/', views.GetTutoringCourses.as_view(), name='get_tutoring_courses'),


    path('get_all_courses/', views.GetAllCourses.as_view(), name='get_all_courses'),

    path('remove_current_course/<str:pk>/', views.removeCurrentCourse, name="remove_current_course"),
    path('remove_past_course/<str:pk>/', views.removePastCourse, name="remove_past_course"),
    path('remove_tutoring_course/<str:pk>/', views.removeTutoringCourse, name="remove_tutoring_course"),

    path('mark_complete/<str:pk>/', views.markComplete, name="mark_complete"),
    path('mark_current/<str:pk>/', views.markCurrent, name="mark_current"),

    path('find_peer/<str:pk1>/<str:pk2>', views.FindPeer.as_view()),
    path('find_tutor/<str:pk1>/<str:pk2>', views.FindTutor.as_view()),
]
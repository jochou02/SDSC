from django.urls import path
from . import views

urlpatterns=[
    path('get_courses_sample/', views.GetCoursesSample.as_view(), name='get_courses_sample'),

    path('get_current_courses/', views.GetCurrentCourses.as_view(), name='get_current_courses'),
    path('get_past_courses/', views.GetPastCourses.as_view(), name='get_past_courses'),
    path('get_tutoring_courses/', views.GetTutoringCourses.as_view(), name='get_tutoring_courses'),

    path('find_peer/<str:pk1>/<str:pk2>', views.FindPeer.as_view()),
    path('find_tutor/<str:pk1>/<str:pk2>', views.FindTutor.as_view()),
]
from django.urls import path
from . import views

app_name = 'review'

urlpatterns=[
    path('get_reviews/', views.GetReviews.as_view(), name='get_reviews'),
    path('get_course_data/', views.GetCourseData.as_view(), name='get_course_data'),
    path('get_course_data_test/', views.GetCourseDataTest.as_view(), name='get_course_data_test'),
]
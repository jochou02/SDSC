from django.urls import path
from . import views

urlpatterns=[
    
    path('<str:pk1>/<str:pk2>/', views.GetReviews.as_view(), name='get_reviews'),
    path('get_course_data', views.GetCourseData.as_view(), name='get_course_data'),
    path('get_course_data_test', views.GetCourseDataTest.as_view(), name='get_course_data_test'),
]
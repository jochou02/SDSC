from django.urls import path, include
from rest_framework import routers
from . import views

router1 = routers.DefaultRouter()
router1.register(r'curr_courses', views.CurrentCourseView, 'curr_courses')
router2 = routers.DefaultRouter()
router2.register(r'past_courses', views.CompletedCourseView, 'past_courses')
router3 = routers.DefaultRouter()
router3.register(r'tutoring_courses', views.TutoringCourseView, 'tutoring_courses')

urlpatterns=[
    path('api/', include(router1.urls)),
    path('api/', include(router2.urls)),
    path('api/', include(router3.urls)),
]
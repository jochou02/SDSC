from django.urls import path
from . import views

urlpatterns = [
    path('gen_prop/', views.generate_props, name='gen_prop')
]
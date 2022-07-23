from rest_framework.authtoken import views as auth_views
from django.urls import path

from . import views

app_name = 'account'

urlpatterns = [
    path('token_auth/', auth_views.obtain_auth_token),
    path('foo/', views.foo.as_view(), name='foo'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('get_user_info/', views.GetUserInfoView.as_view(), name='register'),
]
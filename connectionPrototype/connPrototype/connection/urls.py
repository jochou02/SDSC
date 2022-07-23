from django.urls import path

from . import views

# Namespace
app_name = 'connect'
urlpatterns = [
    path('', views.show_profile, name='show_profile'),
    path('<int:u_id>/match_sent/', views.MatchingSentView.as_view(), name='match_sent'),
    path('<int:u_id>/match_received/', views.MatchingReceivedView.as_view(), name='match_received'),
    path('<int:u_id>/generate_match/', views.GenerateMatchingView.as_view(), name='generate_match'),
    path('get_info/', views.get_info, name='get_info'),
]
from django.urls import path

from .views import UserListView, UserDetailView, MlMajorView

urlpatterns = [
    path('', UserListView.as_view()),
    path('<int:pk>/', UserDetailView.as_view()),
    path('<int:pk>/major', MlMajorView.as_view())
]
from django.urls import path

from .views import ResponseListView, ResponseDetailView

urlpatterns = [
    path('', ResponseListView.as_view()),
    path('<int:pk>/', ResponseDetailView.as_view())
]

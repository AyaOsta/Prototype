from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('questions/', include('questions.urls')),
    path('users/', include('user.urls')),
    path('responses/', include('responses.urls')),
]

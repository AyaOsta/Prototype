from rest_framework import generics

from .models import ResponseModel
from .serializer import ResponseSerializer


# Create your views here.
class ResponseListView(generics.ListCreateAPIView):
    queryset = ResponseModel.objects.all()
    serializer_class = ResponseSerializer


class ResponseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ResponseModel.objects.all()
    serializer_class = ResponseSerializer

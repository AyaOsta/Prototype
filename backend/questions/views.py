from rest_framework import generics

from questions.models import QuestionModel
from questions.serializer import QuestionSerializer


class QuestionListView(generics.ListCreateAPIView):
    queryset = QuestionModel.objects.all()
    serializer_class = QuestionSerializer


class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = QuestionModel.objects.all()
    serializer_class = QuestionSerializer

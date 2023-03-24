from rest_framework import generics

from questions.models import QuestionModel
from questions.serializer import QuestionSerializer


class QuestionListView(generics.ListCreateAPIView):
    queryset = QuestionModel.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        ordering = self.request.query_params.get('ordering', 'number')
        return queryset.order_by(ordering)


class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = QuestionModel.objects.all()
    serializer_class = QuestionSerializer

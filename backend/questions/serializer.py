from rest_framework import serializers

from questions.models import QuestionModel


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionModel
        fields = '__all__'

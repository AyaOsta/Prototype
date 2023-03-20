from django.db import models

from questions.models import QuestionModel
from user.models import UserModel


# Create your models here.
class ResponseModel(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=False)
    question = models.ForeignKey(QuestionModel, on_delete=models.CASCADE, null=False)
    text = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'question')
        db_table = 'response'
        verbose_name = 'responses'

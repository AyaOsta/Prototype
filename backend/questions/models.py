from django.db import models

from user.models import UserModel


# Create your models here.
class QuestionModel(models.Model):
    # number = models.IntegerField(null=False, unique=True)
    text = models.TextField(null=False)
    next = models.ForeignKey('questions.QuestionModel', null=True, blank=True, on_delete=models.SET_NULL,
                             related_name='next_question')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'question'
        verbose_name = 'question'


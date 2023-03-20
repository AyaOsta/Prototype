from django.db import models


# Create your models here.
class UserModel(models.Model):
    GENDER_CHOICES = (
        ('MALE', 'MALE'),
        ('FEMALE', 'FEMALE'),
    )
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    email = models.EmailField(null=True)
    phone = models.CharField(max_length=50, null=True)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=50, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'users'
        db_table = 'users'

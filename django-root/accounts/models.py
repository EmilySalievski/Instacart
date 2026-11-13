from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    profile_pic = models.ImageField(null=True, blank=True, upload_to='profile_pics/')
    bio = models.CharField(max_length=100, blank=True)
    default_currency = models.CharField(max_length=3, default="AUD")
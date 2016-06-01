from django.db import models

class User(models.Model):
  username = models.CharField(max_length=255)

class Photo(models.Model):
  url = models.CharField(max_length=255)

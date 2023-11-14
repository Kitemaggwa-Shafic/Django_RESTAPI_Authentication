from rest_framework import serializers
from django.contrib.auth.models import User

# this class userserializer imports fro model serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "profile_pic",
            "bio"
        ]

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username", 
            "email",
            "password"
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs: dict):
        if len(attrs["password"]) < 8:
            raise serializers.ValidationError("Password needs to be at least 8 characters")
        
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError("Email already in use")

        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data["username"],
            email = validated_data["email"],
            password=validated_data["password"]
        )

        return user

        
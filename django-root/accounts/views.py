from django.shortcuts import render
from .serializers import UserSerializer, UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here.
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user

        result = UserSerializer(profile).data
        return Response({
            "me": result
        })

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        profile = request.data

        data = UserRegistrationSerializer(data=profile)

        if not data.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data.errors)

        data.save()

        return Response({
            "id": data.instance.id
        }, status=status.HTTP_201_CREATED)
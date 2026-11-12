from django.shortcuts import render
from .serializers import UserSerializer, UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, serializers
from drf_spectacular.utils import extend_schema, inline_serializer

# Create your views here.
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=UserSerializer, 
        description='Return logged in user'
    )
    def get(self, request):
        profile = request.user

        result = UserSerializer(profile).data
        return Response(result)

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=UserRegistrationSerializer, 
        responses={
            201: inline_serializer(
                name='UserRegistrationResponse',
                fields={
                    'id': serializers.IntegerField()
                }
            ),
            400: None,
        }, 
        description='Register a user'
    )
    def post(self, request):
        profile = request.data

        data = UserRegistrationSerializer(data=profile)

        if not data.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data.errors)

        data.save()

        return Response({
            "id": data.instance.id
        }, status=status.HTTP_201_CREATED)
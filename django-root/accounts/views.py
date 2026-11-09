from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user

        result = UserSerializer(profile).data
        return Response({
            "me": result
        })
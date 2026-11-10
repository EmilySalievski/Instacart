from django.shortcuts import render
from rest_framework.views import APIView
from .models import WishlistItem
from .serializers import WishlistItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class WishListItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        data = WishlistItemSerializer(data=request.data)

        if not data.is_valid():
            return Response(data=data.errors, status=status.HTTP_400_BAD_REQUEST)

        item = data.save(user=user)

        return Response({
            "id": item.id,
        }, status=status.HTTP_201_CREATED)

    def get(self, request):
        user = request.user.id

        queryset = WishlistItem.objects.filter(user__id=user)

        data = WishlistItemSerializer(queryset, many=True).data

        return Response(data, status=status.HTTP_200_OK)




        

        


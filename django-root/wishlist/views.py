from django.shortcuts import render
from rest_framework.views import APIView
from .models import WishlistItem
from .serializers import WishlistItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

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
        user_id = request.user.id

        queryset = WishlistItem.objects.filter(user__id=user_id)

        data = WishlistItemSerializer(queryset, many=True).data

        return Response(data, status=status.HTTP_200_OK)

class WishlistItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user_id = request.user.id

        queryset = get_object_or_404(WishlistItem, user__id=user_id, id=pk)

        data = WishlistItemSerializer(queryset).data

        return Response(data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        user_id = request.user.id

        queryset = get_object_or_404(WishlistItem, user__id=user_id, id=pk)
        data = WishlistItemSerializer(queryset, data=request.data, partial=True)

        if not data.is_valid():
            return Response(data=data.errors, status=status.HTTP_400_BAD_REQUEST)

        item = data.save()

        new_data = WishlistItemSerializer(item).data

        return Response(new_data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user_id = request.user.id

        item = get_object_or_404(WishlistItem, user__id=user_id, id=pk).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


        


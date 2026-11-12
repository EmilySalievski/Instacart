from django.shortcuts import render
from rest_framework.views import APIView
from .models import WishlistItem
from .serializers import WishlistItemSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, serializers
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, inline_serializer

# Create your views here.
class WishListItemView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=WishlistItemSerializer,
        responses={
            201: inline_serializer(
                name='WishlistItemCreateResponse',
                fields={
                    'id': serializers.IntegerField()
                }
            ),
            400: None,
        }, 
        description='Create wishlist item'
    )
    def post(self, request):
        user = request.user

        data = WishlistItemSerializer(data=request.data)

        if not data.is_valid():
            return Response(data=data.errors, status=status.HTTP_400_BAD_REQUEST)

        item = data.save(user=user)

        return Response({
            "id": item.id,
        }, status=status.HTTP_201_CREATED)

    @extend_schema(
        responses=WishlistItemSerializer(many=True),
        description='Get entire wishlist'
    )
    def get(self, request):
        user_id = request.user.id

        queryset = WishlistItem.objects.filter(user__id=user_id)

        data = WishlistItemSerializer(queryset, many=True).data

        return Response(data, status=status.HTTP_200_OK)

class WishlistItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=WishlistItemSerializer,
        description='Get wishlist item'
    )
    def get(self, request, pk):
        user_id = request.user.id

        queryset = get_object_or_404(WishlistItem, user__id=user_id, id=pk)

        data = WishlistItemSerializer(queryset).data

        return Response(data, status=status.HTTP_200_OK)
    
    @extend_schema(
        request=WishlistItemSerializer,
        responses=WishlistItemSerializer,
        description='Update a wishlist item'
    )
    def patch(self, request, pk):
        user_id = request.user.id

        queryset = get_object_or_404(WishlistItem, user__id=user_id, id=pk)
        data = WishlistItemSerializer(queryset, data=request.data, partial=True)

        if not data.is_valid():
            return Response(data=data.errors, status=status.HTTP_400_BAD_REQUEST)

        item = data.save()

        new_data = WishlistItemSerializer(item).data

        return Response(new_data, status=status.HTTP_200_OK)

    @extend_schema(
        responses={
            204: None,
            404: None,
        }, 
        description='Delete a wishlist item'
    )
    def delete(self, request, pk):
        user_id = request.user.id

        item = get_object_or_404(WishlistItem, user__id=user_id, id=pk).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


        


from rest_framework import serializers
from .models import Product, WishlistItem

class WishlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishlistItem
        fields = [
            "status",
            "date_added",
            "ready_date",
            "product"
        ]

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "product_url"
        ]
from rest_framework import serializers
from .models import Product, WishlistItem
from datetime import timedelta
from django.utils import timezone

class WishlistItemSerializer(serializers.ModelSerializer):
    days_to_wait = serializers.IntegerField(default=7)

    class Meta:
        model = WishlistItem
        fields = [
            "status",
            "product",
            "name",
            "brand",
            "price",
            "desc",
            "url",
            "image",
            "days_to_wait",
        ]

    def create(self, validated_data):
        days = validated_data["days_to_wait"]

        ready_date = timezone.localdate() + timedelta(days=days)

        item = WishlistItem.objects.create(
            user = validated_data["user"],
            name = validated_data.get("name"),
            brand = validated_data.get("brand"),
            price = validated_data.get("price"),
            desc = validated_data.get("desc"),
            url = validated_data.get("url"),
            image = validated_data.get("image"),
            ready_date = ready_date,
        )

        return item



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "product_url"
        ]
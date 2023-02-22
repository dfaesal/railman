from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Customer, City, Order, Restaurant, MenuItem

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name')

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'price']
        
class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Customer
        fields = ['id', 'user', 'name', 'phone', 'email', 'address', 'pincode', 'password', 'role', 'city']

class OrderSerializer(serializers.ModelSerializer):
    customerName = serializers.SerializerMethodField()
    orderItems = serializers.SerializerMethodField()
    restaurant = serializers.CharField(source='restaurant.__str__', read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'restaurant', 'orderItems', 'total_cost', 'timestamp', 'status', 'customerName']

    def get_customerName(self, obj):
        return obj.user.username

    def get_orderItems(self, obj):
        items_names = obj.items.values_list('name', flat=True)
        return list(items_names)

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'phone', 'email', 'address', 'pincode', 'city', 'rating']

 
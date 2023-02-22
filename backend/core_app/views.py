from rest_framework import generics
from core_app.serializers import CustomerSerializer, CitySerializer, OrderSerializer, RestaurantSerializer
from .models import City, Customer, Order, Restaurant
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CityList(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    
class CityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class RestaurantList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    
class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class Orders(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        restaurant = self.kwargs.get('restaurant')
        user_id = self.kwargs.get('user_id')
        pk = self.kwargs.get('pk')
        if user_id:
            queryset = Order.objects.filter(user_id=user_id, id=pk)
        else:
            queryset = Order.objects.filter(restaurant__name=restaurant, id=pk)
        return queryset

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        data = request.data
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class OrderList(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        name = self.kwargs.get('restaurant')
        user = self.kwargs.get('user_id', None)

        if user:
            queryset = Order.objects.filter(user_id=user)
        else:
            print(name, user)
            restaurant = Restaurant.objects.get(name=name)
            queryset = Order.objects.filter(restaurant=restaurant)
        return queryset


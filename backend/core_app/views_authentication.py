from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from core_app.models import Customer, City
from core_app.serializers import CustomerSerializer, RestaurantSerializer

####################   Authentication - register 

@api_view(['POST'])
def register(request):
	if request.method == 'POST':
		new_user_data = JSONParser().parse(request)
		user_email = new_user_data['email']
		user_role = new_user_data['role']
		if user_email is not None and user_role is not None:
			customers = Customer.objects.all()
			customer = customers.filter(email__icontains=user_email) 
			if(len(customer) == 0):
				if (user_role == "customer" or user_role == "restaurant"):
					city, created = City.objects.get_or_create(name=new_user_data.get('city'))
					new_user_data['city'] = city.id
					if(user_role == "restaurant"):
						serializer = RestaurantSerializer(data=new_user_data)
						if serializer.is_valid():
							serializer.save()
					user, created = User.objects.get_or_create(username=new_user_data.get('name'))
					if created:
						user.set_password(new_user_data.get('password'))
						user.save()
						new_user_data['user'] = user.id
					serializer = CustomerSerializer(data=new_user_data)
					if serializer.is_valid():
						serializer.save()
						return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
					return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
				else:
					return JsonResponse({'message': 'Role Not supported!'}, status=status.HTTP_204_NO_CONTENT)
			else:
				return JsonResponse({'message': 'User already exists!'}, status=status.HTTP_202_ACCEPTED)
		else:
			return JsonResponse({'message': 'Check the registration details again!'}, status=status.HTTP_204_NO_CONTENT)

####################   Authentication - login 

@api_view(['POST'])
def login(request):
	if request.method == 'POST':
		user_data = JSONParser().parse(request)
		user_email = user_data['email']
		user_password = user_data['password']
		user_role = user_data['role']
		if user_email is not None and user_role is not None and user_password is not None:
			customers = Customer.objects.all()
			customer = customers.filter(email=user_email,
										password=user_password,
										role=user_role)
			if(len(customer) != 0):
				serializer = CustomerSerializer(customer, many=True)
				return JsonResponse(serializer.data, safe=False)
			else:
				return JsonResponse({'message': 'user_not_exist'}, status=status.HTTP_204_NO_CONTENT)
		else:
			return JsonResponse({'message': 'login_details_wrong'}, status=status.HTTP_204_NO_CONTENT)

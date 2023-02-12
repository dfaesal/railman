from django.db import models

class Customer(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=70, blank=True, default='')
    email = models.CharField(max_length=200,blank=False, default='')
    password = models.CharField(max_length=200,blank=False, default='')
    phone = models.IntegerField(blank=True)
    address = models.CharField(max_length=200,blank=True, default='')
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True)
    role = models.CharField(max_length=10, blank=True)
    pincode = models.IntegerField(blank=True)

class Restaurant(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=70, blank=True, default='')
    phone = models.IntegerField(blank=True)
    email = models.CharField(max_length=200,blank=False, default='')
    address = models.CharField(max_length=200,blank=True, default='')
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True)
    pincode = models.IntegerField(blank=True)
    rating = models.DecimalField(max_digits=5, decimal_places=2, blank=True)

class MenuItem(models.Model):
    def __str__(self):
        return self.name
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, default='')
    price = models.DecimalField(max_digits=5, decimal_places=2, blank=True)

class City(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=20,blank=False, default='')

class Order(models.Model):
    def __str__(self):
        return self.customer
    customer = models.ForeignKey('Customer', on_delete=models.SET_NULL, null=True)
    restaurant = models.ForeignKey('Restaurant', on_delete=models.SET_NULL, null=True)
    payment = models.ForeignKey('Payment', on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True)
    ordered_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=100, default='pending')

class Payment(models.Model):
    def __str__(self):
        return self.customer
    pay_mode = models.CharField(max_length=20,blank=False, default='')
    charges = models.IntegerField()
    pay_status = models.CharField(max_length=20,blank=False, default='')
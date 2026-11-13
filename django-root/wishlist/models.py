from django.db import models

# Create your models here.
class Status(models.TextChoices):
        BOUGHT = "BOUGHT", "Bought"
        RESISTED = "RESISTED", "Resisted"
        
class WishlistItem(models.Model):
    user = models.ForeignKey(to='accounts.User', on_delete=models.CASCADE)
    status = models.CharField(choices=Status.choices, max_length=8, null=True, blank=True)
    date_added = models.DateField(auto_now_add=True)
    ready_date = models.DateField()
    brand = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=1000)
    desc = models.CharField(max_length=1000, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
    currency = models.CharField(max_length=3, default='AUD')
    url = models.URLField(blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='items/')

    product = models.ForeignKey(to='wishlist.Product', on_delete=models.PROTECT, null=True, blank=True)

# might use this later to match similar wishlist items across users
class Product(models.Model):
    product_url = models.URLField(blank=False)
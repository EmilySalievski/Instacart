from django.db import models

# Create your models here.
class Status(models.TextChoices):
        WAITING = "WAITING", "Waiting"
        BOUGHT = "BOUGHT", "Bought"
        RESISTED = "RESISTED", "Resisted"
        
class WishlistItem(models.Model):
    user = models.ForeignKey(to='accounts.User', on_delete=models.CASCADE)
    status = models.CharField(choices=Status.choices, max_length=8)
    date_added = models.DateField(auto_now_add=True)
    ready_date = models.DateField()

    product = models.ForeignKey(to='wishlist.Product', on_delete=models.PROTECT)

# might use this later to match similar wishlist items across users
class Product(models.Model):
    product_url = models.CharField(blank=False)
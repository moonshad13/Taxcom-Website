from django.urls import path
from .views import fetch_reviews, add_review

urlpatterns = [
    path('reviews/', fetch_reviews, name='fetch_reviews'),
    path('add-review/', add_review, name='add_review'),
]

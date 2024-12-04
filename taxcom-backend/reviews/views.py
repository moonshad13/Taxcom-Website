from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import render
import json

from .models import Review

def fetch_reviews(request):
    reviews = Review.objects.all().order_by('-created_at')
    reviews_list = [
        {"name": review.name, "rating": review.rating, "review_text": review.review_text}
        for review in reviews
    ]
    return JsonResponse(reviews_list, safe=False)

@method_decorator(csrf_exempt, name='dispatch')
def add_review(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        rating = data.get('rating')
        review_text = data.get('review_text')
        Review.objects.create(name=name, rating=rating, review_text=review_text)
        return JsonResponse({"message": "Review added successfully!"})

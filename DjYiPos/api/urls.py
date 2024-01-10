from django.urls import path
from .views import SignInAPIView

urlpatterns = [
    path('auth/sign-in', SignInAPIView.as_view(), name='api-sign-in'),
]
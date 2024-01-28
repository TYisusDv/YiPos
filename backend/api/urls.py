from django.urls import path
from .views import SignInAPIView, UserInfoAPIView, TestAPIView

urlpatterns = [
    path('auth/sign-in', SignInAPIView.as_view(), name='api-sign-in'),
    path('user/info', UserInfoAPIView.as_view(), name='user-info'),
    path('test', TestAPIView.as_view(), name='test'),
]
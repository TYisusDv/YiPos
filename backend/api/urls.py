from django.urls import path
from .views import SignInAPIView, UserInfoAPIView, ManageUsersAPIView

urlpatterns = [
    path('auth/sign-in', SignInAPIView.as_view(), name='api-sign-in'),
    path('user/info', UserInfoAPIView.as_view(), name='user-info'),
    path('manage/users', ManageUsersAPIView.as_view(), name='manage-users'),
]
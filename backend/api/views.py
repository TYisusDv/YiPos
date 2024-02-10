from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, get_user_model
from django.utils import timezone
from django.core.paginator import Paginator
from django.core.validators import validate_email
from django.db.models import Q
from .serializers import *
import datetime

class SignInAPIView(APIView):
    permission_classes = [AllowAny]
  
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')              

        if not username:
            return Response({'success': False, 'msg': 'Por favor, proporcione un usuario válido.'}, status = 400)
        elif not password:
            return Response({'success': False, 'msg': 'Por favor, proporcione una contraseña válida.'}, status = 400)
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'success': True, 
                'msg': 'Redireccionando...',
                'token': access_token
            })
        
        return JsonResponse({'success': False, 'msg': 'Usuario o contraseña incorrecta.'}, status = 401)
        
class UserInfoAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            user = request.user
            userInfo = {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'username': user.username,
                'email': user.email,
            }
            return JsonResponse({'success': True, 'user': userInfo})
        except AuthenticationFailed:
            return JsonResponse({'success': False, 'msg': 'Usuario no autenticado.'}, status = 401)

class ManageUsersAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        search_query = request.query_params.get('search', '')
        page_number = request.query_params.get('page', 1)
        order_by = request.query_params.get('order_by', 'id')
        order = request.query_params.get('order', 'asc')
        show = request.query_params.get('show', 10)
        
        if order_by == 'actions':
            order_by = 'id'

        users = get_user_model().objects.filter(
            Q(username__icontains=search_query) |
            Q(first_name__icontains=search_query) |
            Q(last_name__icontains=search_query) |
            Q(email__icontains=search_query)
        )

        if order == 'desc':
            order_by = f'-{order_by}'

        users = users.order_by(order_by)
        paginator = Paginator(users, show)
        users_page = paginator.page(page_number)

        serialized_users = ManageUsersTableSerializer(users_page, many=True)

        return JsonResponse({
            'success': True,
            'data': serialized_users.data,
            'total_pages': paginator.num_pages,
            'current_page': users_page.number
        })
    
    def put(self, request):
        data = request.data
        
        username = data.get('username')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')

        userModel = get_user_model()
        if userModel.objects.filter(username=username).exists():
            return Response({
                'success': False, 
                'msg': {
                    'username': ['Este nombre de usuario ya está en uso. Por favor, proporciona un nombre de usuario.']
                }
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_email(email)
        except:
            return Response({
                'success': False, 
                'msg': {
                    'email': ['El correo electrónico es incorrecto. Por favor, proporcione un correo electrónico valido.']
                }
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ManageUsersAddSerializer(data=data)
        if serializer.is_valid():
            newUser = userModel.objects.create_user(username=username, password=password, first_name=first_name, last_name=last_name, email=email)
            return JsonResponse({
                'success': True, 
                'msg': 'Se registró correctamente.'
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                'success': False, 
                'msg': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

def handler404(request, exception):
    return JsonResponse({
        'success': False, 
        'msg': 'Página no encontrada'
    }, status=status.HTTP_404_NOT_FOUND)

def handler500(request):
    return JsonResponse({
        'success': False, 
        'msg': 'Error interno del servidor'
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
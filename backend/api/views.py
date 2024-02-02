from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login, get_user_model
from django.utils import timezone
from django.core.paginator import Paginator
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
        
        user = authenticate(request, username = username, password = password)
        if user is not None:
            login(request, user)
            
            token, created = Token.objects.get_or_create(user=user)
            if not created and token.created < timezone.now() - datetime.timedelta(days=1):
                token.delete()
                token = Token.objects.create(user = user)          

            return Response({
                'success': True, 
                'msg': 'Redireccionando...',
                'token': token.key
            })
        else:
            return Response({'success': False, 'msg': 'Usuario o contraseña incorrecta.'}, status = 401)
        
class UserInfoAPIView(APIView):
    authentication_classes = [TokenAuthentication]
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
            return Response({'success': True, 'user': userInfo})
        except AuthenticationFailed:
            return Response({'success': False, 'msg': 'Usuario no autenticado.'}, status = 401)

class ManageUsersAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        search_query = request.query_params.get('search', '')
        page_number = request.query_params.get('page', 1)
        order_by = request.query_params.get('order_by', 'id')
        order = request.query_params.get('order', 'asc')
        show = request.query_params.get('show', 10)

        users = get_user_model().objects.filter(
            Q(username__icontains = search_query) |
            Q(first_name__icontains = search_query) |
            Q(last_name__icontains = search_query) |
            Q(email__icontains = search_query)
        )

        if order == 'desc':
            order_by = f'-{order_by}'

        users = users.order_by(order_by)
        paginator = Paginator(users, show)
        users_page = paginator.page(page_number)

        serialized_users = ManageUsersTableSerializer(users_page, many = True)
        
        return Response({
            'success': True,
            'data': serialized_users.data,
            'total_pages': paginator.num_pages,
            'current_page': users_page.number
        })
    
    def put(self, request):
        data = request.data

        serializer = ManageUsersAddSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
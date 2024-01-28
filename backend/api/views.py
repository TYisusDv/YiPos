from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login
from django.utils import timezone
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
                
            return Response({'success': True, 'msg': 'Redireccionando...', 'token': token.key})
        else:
            return Response({'success': False, 'msg': 'Usuario o contraseña incorrecta.'}, status = 401)
        
class UserInfoAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            user = request.user
            user_info = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
            return Response({'success': True, 'user': user_info})
        except AuthenticationFailed:
            return Response({'success': False, 'msg': 'Usuario no autenticado'}, status = 401)

class TestAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            data = [
                {"id": 1, "nombre": "Juan", "edad": 25},
                {"id": 2, "nombre": "Maria", "edad": 30},
            ]

            columns = [
                {"Header": "ID", "accessor": "id"},
                {"Header": "Nombre", "accessor": "nombre"},
                {"Header": "Edad", "accessor": "edad"},
            ]

            return Response({'success': True, 'data': data, 'columns': columns})
        except AuthenticationFailed:
            return Response({'success': False, 'msg': 'Usuario no autenticado'}, status = 401)
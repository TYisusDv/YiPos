from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.permissions import AllowAny

class LoginAPIView(APIView):
    permission_classes = [AllowAny]
  
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')              

        if not email:
            return Response({'success': False, 'msg': 'Por favor, proporcione un correo electrónico válido.'}, status = 400)
        elif not password:
            return Response({'success': False, 'msg': 'Por favor, proporcione una contraseña válida.'}, status = 400)
        
        user = authenticate(request, username = email, password = password)
        if user is not None:
            login(request, user)
            
            token, created = Token.objects.get_or_create(user = user)
            return Response({'success': True, 'token': token.key})
        else:
            return Response({'success': False, 'msg': 'Credenciales inválidas'}, status = 401)
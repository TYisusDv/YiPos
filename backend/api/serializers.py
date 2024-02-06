from rest_framework import serializers
from django.contrib.auth import get_user_model

class ManageUsersTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'last_login', 'username', 'first_name', 'last_name', 'email', 'is_active', 'date_joined']

class ManageUsersAddSerializer(serializers.ModelSerializer):
    username = serializers.CharField(error_messages={
        'unique': 'Este nombre de usuario ya está en uso. Por favor, elige otro.',
        'blank': 'El nombre de usuario no puede estar en blanco. Por favor, proporciona un nombre de usuario.',
        'null': 'El nombre de usuario no puede estar en blanco. Por favor, proporciona un nombre de usuario.',
    })
    password = serializers.CharField(error_messages={
        'blank': 'La contraseña no puede estar en blanco. Por favor, proporciona una contraseña.',
        'null': 'La contraseña no puede estar en blanco. Por favor, proporciona una contraseña.',
    })
    first_name = serializers.CharField(error_messages={
        'blank': 'El nombre no puede estar en blanco. Por favor, proporciona un nombre.',
        'null': 'El nombre no puede estar en blanco. Por favor, proporciona un nombre.',
    })
    last_name = serializers.CharField(error_messages={
        'blank': 'El apellido no puede estar en blanco. Por favor, proporcione un apellido.',
        'null': 'El apellido no puede estar en blanco. Por favor, proporcione un apellido.',
    })
    email = serializers.CharField(error_messages={
        'blank': 'El correo electrónico no puede estar en blanco. Por favor, proporcione un correo electrónico.',
        'null': 'El correo electrónico no puede estar en blanco. Por favor, proporcione un correo electrónico.',
    })

    class Meta:
        model = get_user_model()
        fields = '__all__'
    
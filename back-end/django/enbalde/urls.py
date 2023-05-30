from django.urls import path
from .views.usuario_views import LoginView, LogoutView, SignupView
#from .views.jwt_token import TokenObtainPairView

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/signup/', SignupView.as_view(), name='auth_signup'),
    #path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair')
]

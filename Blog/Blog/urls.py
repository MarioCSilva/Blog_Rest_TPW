"""Blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework import permissions

from app import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Blogwhere",
        default_version='v1',
        description="API for the website",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)


urlpatterns = [
    path('admin', admin.site.urls),

    path('ws/register', views.register, name='register'),
    path('ws/login', obtain_auth_token, name='login'),
    path('ws/main/blog', views.main_blog, name="home_blog"),
    path('ws/main/posts', views.main_posts, name="home_posts"),
    path('ws/profile', views.Profile.as_view(), name='profile'),
    path('ws/new_post', views.new_post, name='new_post'),
    path('ws/post_comment', views.post_comment, name="post_comment"),
    path('ws/blog_follow', views.blog_follow, name="follow_blog"),
    path('ws/blog', views.BlogPage.as_view(), name='blog_page'),
    path('ws/topics', views.topics, name='topics'),
    path('ws/like_post', views.like_post, name="like_post"),
    path('ws/settings', views.Settings.as_view(), name="settings"),

    path('ws/schema/swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('ws/schema/redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

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
from django.contrib.auth import views as auth_views
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
    path('admin/', admin.site.urls),
    path('', views.main_page2, name="home"),
    path('profile/<str:name>', views.profile_page2, name="profile"),
    path('my_profile', views.my_profile2),
    path('login/', views.entry_page2, name='login'),
    path('blog/<int:num>', views.blog_page2, name='blog'),
    path('logout', auth_views.LogoutView.as_view(next_page='login/'), name='logout'),
    path('my_blog/', views.my_blog2),
    path('blog_owners/', views.blog_owners2),
    path('blog_topics/', views.blog_topics2),
    path('blog_edit/', views.blog_edit2),
    path('blog_subs/', views.blog_subs2),
    path('blog_follow/', views.blog_follow2),
    path('blog_delete/', views.blog_delete2),
    path('blog_visibility/', views.blog_visibility2),
    path('blog_invites/', views.blog_invites2),
    path('blog_post/', views.blog_post2),
    path('settings/', views.settings2, name="settings"),
    path('post_comment/', views.post_comment2),
    path('post_like/', views.post_like2),
    path('blog_pic/', views.blog_pic2),

    path('ws/my_profile', views.my_profile2),
    path('ws/logout', auth_views.LogoutView.as_view(next_page='login/'), name='logout'),
    path('ws/blog_owners', views.blog_owners2),
    path('ws/blog_topics', views.blog_topics2),
    path('ws/blog_edit', views.blog_edit2),
    path('ws/blog_subs', views.blog_subs2),
    path('ws/blog_delete', views.blog_delete2),
    path('ws/blog_visibility', views.blog_visibility2),
    path('ws/blog_invites', views.blog_invites2),
    path('ws/blog_post', views.blog_post2),
    path('ws/settings', views.settings2, name="settings"),
    path('ws/post_like', views.post_like2),
    path('ws/blog_pic', views.blog_pic2),

    path('ws/register', views.register, name='register'),
    path('ws/login', obtain_auth_token, name='login'),
    path('ws', views.main_page, name="home"),
    path('ws/profile/<str:name>', views.Profile.as_view(), name='profile'),
    path('ws/my_blog', views.my_blog, name='my_blog'),
    path('ws/new_post', views.new_post, name='new_post'),
    path('ws/new_blog', views.new_blog, name='new_blog'),
    path('ws/post_comment', views.post_comment),
    path('ws/blog_follow', views.blog_follow),
    path('ws/blog/<int:num>', views.blog_page, name='blog'),

    path('ws/schema/swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('ws/schema/redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

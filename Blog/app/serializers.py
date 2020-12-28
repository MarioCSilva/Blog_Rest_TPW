from app.models import Client, Topic, Blog, Post, Comment
from rest_framework import serializers


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = {'id', 'name', 'user', 'description', 'profile_pic', 'birthdate', 'sex'}


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = {'name'}


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = {'name', 'owner', 'subs', 'blog_pic', 'isPublic', 'invites', 'description', 'topic'}


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = {'title', 'client', 'date', 'image', 'text', 'blog', 'likes'}


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = {'text', 'client', 'date', 'post'}
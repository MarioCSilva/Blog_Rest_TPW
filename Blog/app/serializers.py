from django.contrib.auth.models import User

from app.models import Client, Topic, Blog, Post, Comment
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ["username", "password", "password2", "email"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user

    def update(self, instance):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password':'Passwords must match.'})
        instance.set_password(password)
        instance.email = self.validated_data['email']

        return instance

class ClientSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField()
    # PROFILE PIC
    class Meta:
        model = Client
        fields = ['id', 'name', 'user_id', 'description', 'birthdate', 'sex']
        extra_kwargs = {"id": {"required": False, "allow_null": True}}

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        ret['user'] = UserSerializer(instance.user).data
        return ret  


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name']


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'name', 'owner', 'subs', 'blog_pic', 'isPublic', 'invites', 'description', 'topic']

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        ret['owner'] = ClientSerializer(instance.owner.all(), many=True).data
        ret['subs'] = ClientSerializer(instance.subs.all(), many=True).data
        ret['invites'] = ClientSerializer(instance.invites.all(), many=True).data
        ret['topic'] = TopicSerializer(instance.topic.all(), many=True).data

        # add all posts to the blog
        ret['posts'] = PostSerializer(Post.objects.filter(blog=instance.id), many=True).data

        return ret


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'client', 'date', 'image', 'text', 'blog', 'likes']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # add all comments to the post
        ret['comments'] = CommentSerializer(Comment.objects.filter(post=instance.id), many=True).data
        return ret


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text', 'client', 'date', 'post']

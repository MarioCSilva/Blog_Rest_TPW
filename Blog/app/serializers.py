from django.contrib.auth.models import User
from rest_framework.generics import get_object_or_404

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
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        instance.set_password(password)
        instance.email = self.validated_data['email']
        instance.save()

        return instance


class ClientSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField()

    # PROFILE PIC
    class Meta:
        model = Client
        fields = ['id', 'name', 'user_id', 'description', 'birthdate', 'sex', 'profile_pic']
        extra_kwargs = {"id": {"required": False, "allow_null": True}}

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        ret['user'] = UserSerializer(instance.user).data
        ret['profile_pic'] = 'http://www.localhost:8000'+ret['profile_pic']
        return ret


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name']


class BlogSerializer(serializers.ModelSerializer):
    accepted_invites = ClientSerializer(many=True, read_only=True, required=False)
    req_client_id = ClientSerializer(read_only=True, required=False)

    class Meta:
        model = Blog
        fields = ['id', 'name', 'owner', 'subs', 'blog_pic',
                  'isPublic', 'invites', 'description', 'topic',
                  'accepted_invites', 'req_client_id']

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        ret['owner'] = ClientSerializer(instance.owner.all(), many=True).data
        ret['subs'] = ClientSerializer(instance.subs.all(), many=True).data
        ret['invites'] = ClientSerializer(instance.invites.all(), many=True).data
        ret['topic'] = TopicSerializer(instance.topic.all(), many=True).data

        # add all posts to the blog
        ret['posts'] = PostSerializer(Post.objects.filter(blog=instance.id), many=True).data

        return ret

    def update(self, instance, validated_data):
        if 'name' in validated_data:
            instance.name = validated_data['name']
        if 'description' in validated_data:
            instance.description = validated_data['description']
        if 'owner' in validated_data:
            instance.owner.set(validated_data['owner'])
        if 'subs' in validated_data:
            instance.subs.set(validated_data['subs'])
        if 'isPublic' in validated_data:
            instance.isPublic = validated_data['isPublic']
        if 'topic' in validated_data:
            instance.topic.set(validated_data['topic'])

        # accept invites
        if 'accepted_invites' in validated_data:
            for client_id in validated_data['accepted_invites']:
                client = get_object_or_404(Client, id=client_id)
                instance.subs.add(client.id)
                instance.invites.remove(client.id)

        # accept all invites when changing to blog to public
        if 'isPublic' in validated_data:
            if validated_data['isPublic']:
                for client in instance.invites.all():
                    instance.subs.add(client.id)
                instance.invites.set([])

        # do not let a owner unsubscribe from his blog
        if 'subs' in validated_data:
            if 'req_client_id' in validated_data:
                if validated_data['req_client_id'] not in validated_data['subs']:
                    instance.subs.add(validated_data['req_client_id'])

        instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','title', 'client', 'date', 'image', 'text', 'blog', 'likes']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # add all comments to the post
        ret['comments'] = CommentSerializer(Comment.objects.filter(post=instance.id), many=True).data
        return ret


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text', 'client', 'date', 'post']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['username'] = instance.client.user.username
        return ret
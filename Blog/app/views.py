import json
import datetime

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from app.forms import *
from app.models import Client, Post, Blog, Topic
from django.db.models import Count



from app.serializers import UserSerializer, ClientSerializer, TopicSerializer, BlogSerializer, PostSerializer, \
    CommentSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        request.data['user_id'] = user.id
    else:
        return Response(user_serializer.errors, status=HTTP_400_BAD_REQUEST)

    client_serializer = ClientSerializer(data=request.data)
    data = {}
    if client_serializer.is_valid():
        client = client_serializer.save()
        data['response'] = 'successfully registered a new client'
        data['token'] = Token.objects.get(user=client.user).key
    else:
        return Response(client_serializer.errors, status=HTTP_400_BAD_REQUEST)
    return Response(data)


@permission_classes([IsAuthenticated])
class Profile(APIView):
    def get(self, request):
        # returns client for the user that made the request
        name = request.GET.get('name')
        cclient = None
        if name is not None:
            cclient = get_object_or_404(Client, user__username=name)
        else:
            cclient = get_object_or_404(Client, user__id=request.user.id)

        subscriptions = Blog.objects.filter(subs__in=[cclient.id])

        print(subscriptions)
        client_serializer = ClientSerializer(cclient)

        data = {"client": client_serializer.data,
                "owner": request.user.username == cclient.user.username,
                "subscriptions": BlogSerializer(subscriptions, many=True).data
                }

        return Response(data)

    def put(self, request):
        # TODO: see if the gender value is valid

        client = get_object_or_404(Client, user__id=request.user.id)

        if client.user.id != request.user.id:
            return Response({"error": "not enough permissions"}, status=HTTP_401_UNAUTHORIZED)

        data = json.loads(request.data['client'])
        if request.data.get('file'):
            data['profile_pic'] = request.data.get('file')
        else:
            del data['profile_pic']

        # birthdate is a Date 'yyyy-mm-dd' but angular sends the same with other stuff
        # remove them so that django can validate the given date
        if data['birthdate']:
            data['birthdate'] = data['birthdate'].split('T')[0]

        client_serializer = ClientSerializer(client, data=data, partial=True)

        if client_serializer.is_valid():
            client_serializer.save()
            data = {"client": client_serializer.data}
        else:
            return Response(client_serializer.errors, status=HTTP_400_BAD_REQUEST)

        return Response(data)


@permission_classes([IsAuthenticated])
class Settings(APIView):
    def get(self, request):
        user = get_object_or_404(User, id=request.user.id)
        user_serializer = UserSerializer(user)

        data = {'user': user_serializer.data}
        return Response(data)

    def put(self, request):
        user = get_object_or_404(User,id=request.user.id)
        user_serializer = UserSerializer(user,data=request.data,partial=True)

        if user_serializer.is_valid():
            user_serializer.update(user)
            data = {"success": "successfully updated settings"}
        else:
            return Response(user_serializer.errors, status=HTTP_400_BAD_REQUEST)

        return Response(data)

    def delete(self, request):

        user = get_object_or_404(User, id=request.user.id)
        client = get_object_or_404(Client, id=user.client.id)

        blogs = Blog.objects.filter(owner__in=[client])
        for blog in blogs:
            if len(blog.owner.all()) == 1:
                blog.delete()

        client.delete()
        user.delete()

        return Response({"success": "successfully deleted account"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request):
    data = request.data
    client = get_object_or_404(Client, user=request.user)
    data['client'] = client.id

    # check permissions to create a comment on this post
    post = get_object_or_404(Post, id=data['post'])
    blog = Blog.objects.get(id=post.blog.id)

    if not blog.isPublic and not client in blog.subs.all():
        return Response({'error': 'not enough permissions'}, status=HTTP_401_UNAUTHORIZED)
    else:
        com_serializer = CommentSerializer(data=data)

        if com_serializer.is_valid():
            com_serializer.save()
            data = {'success': 'successfully added a comment to post', 'comment': com_serializer.data}
        else:
            data = com_serializer.errors

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def main_blog(request):
    search = request.GET.get("search")
    topics = request.GET.getlist("topics")
    choice = request.GET.get("order")
    order = request.GET.get("orderBy")

    if not search:
        search = ""
    # searches for pages with that name or owner name
    blogs = (Blog.objects.filter(
        name__contains=search).distinct())  # | Blog.objects.filter(owner__user__name__in=search))
    if topics and topics[0] != '':
        topics = topics[0].split(',')
        blogs = blogs & (Blog.objects.filter(topic__id__in=topics).distinct())

    if order == "asc":
        order = ""
    elif order == "desc":
        order = "-"

    #blogs = blogs.annotate(subsn=Count("subs"))

    if choice == "subs":
        blogs = blogs.annotate(count=Count("subs")).order_by(order + "count")
    elif choice == "posts":
        blogs = blogs.annotate(count=Count("post")).order_by(order + "count")
    blogs_serializer = BlogSerializer(blogs, many=True)

    return Response(blogs_serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def main_posts(request):

    # get the client that did the request
    client = get_object_or_404(Client, user=request.user)

    # get the blogs that the client subscribed and order the posts by recent
    post_blogs = Blog.objects.filter(subs__in=[client])
    posts = Post.objects.filter(blog__in=post_blogs).order_by("-date")

    search = request.GET.get("search")
    choice = request.GET.get("order")
    order = request.GET.get("orderBy")

    if search is None:
        search = ""

    posts = (Post.objects.filter(title__contains=search, blog__in=post_blogs) \
             | Post.objects.filter(client__user__username__contains=search, blog__in=post_blogs))

    if order == "asc":
        order = ""
    elif order == "desc":
        order = "-"

    if choice == "recent":
        posts = posts.order_by(order + "date")
    elif choice == "likes":
        posts = posts.annotate(count=Count("likes")).order_by(order + "count")
    elif choice == "comments":
        posts = posts.annotate(count=Count("comment")).order_by(order + "count")

    posts = PostSerializer(posts,many=True).data
    for post in posts:
        if client.id in post['likes']: # post.likes:
            post['liked'] = True

    return Response(posts)


@permission_classes([IsAuthenticated])
class BlogPage(APIView):
    def get(self, request):
        data = request.data

        req_client = get_object_or_404(Client, user=request.user)

        num = request.GET.get('id', None)
        if num is not None:
            blog = Blog.objects.get(id=num)
        else:
            topic = Topic.objects.get(name="Personal")
            blog = Blog.objects.get(topic=topic, owner__in=[req_client])

        posts = []

        if "search_post" in data:
            posts = Post.objects.filter(blog=blog.id)

            search = data["search_post"]
            choice = data["order_choice_post"]
            order = data["order_by_post"]
            # searchs for posts by name or by client name
            posts = (Post.objects.filter(title__contains=search, blog=blog.id)
                     | Post.objects.filter(client__user__username__contains=search, blog=blog.id))

            if order == "asc":
                order = ""
            elif order == "desc":
                order = "-"

            if choice == "recent":
                posts = posts.order_by(order + "date")
            elif choice == "likes":
                posts = posts.order_by(order + "likes", "-date")
            elif choice == "comments":
                posts = posts.annotate(count=Count("comment")).order_by(order + "count")

            posts = PostSerializer(posts, many=True).data
            for post in posts:
                post['req_client_like'] = len(
                    [client_id for client_id in post['likes'] if req_client.id == client_id]) > 0

        # check if this blog is the client's personal
        personal = len([topic for topic in blog.topic.all() if topic.name == "Personal"]) > 0

        # check if the client has permission for this blog
        permission = len([client for client in blog.owner.all() if req_client == client]) > 0

        # check if the client is subbed to this blog
        subbed = len([client for client in blog.subs.all() if req_client == client]) > 0

        blog_data = BlogSerializer(blog).data
        blog_data.update({'personal': personal, 'permission': permission, 'subbed': subbed})

        if posts:
            blog_data['update'] = posts

        if not subbed:
            blog_data['posts'] = []

        return Response(blog_data)

    def post(self, request):
        data = json.loads(request.data['data'])
        client = get_object_or_404(Client, user=request.user).id
        data['client'] = client
        data['owner'] = [client]
        data['subs'] = [client]

        if request.data.get('file'):
            data['blog_pic'] = request.data['file']

        blog_serializer = BlogSerializer(data=data)

        if blog_serializer.is_valid():
            blog_serializer.save()
            data = {
                'success': 'successfully created a new blog',
                'blog': blog_serializer.data
            }
        else:
            data = blog_serializer.errors

        return Response(data)

    def put(self, request):
        req_client = get_object_or_404(Client, user=request.user)

        num = request.GET.get('id', None)
        if num is not None:
            blog = Blog.objects.get(id=num)
        else:
            topic = Topic.objects.get(name="Personal")
            blog = Blog.objects.get(topic=topic, owner__in=[req_client])

        if req_client not in blog.owner.all():
            return Response({"error": "not enough permissions"}, status=HTTP_401_UNAUTHORIZED)

        if 'owner' in request.data:
            owners = set()
            for owner in request.data['owner']:
                owners.add(get_object_or_404(Client, user__username__exact=owner).id)
            if req_client.id not in owners:
                return Response({"error": "Can't remove yourself from blog"}, status=HTTP_400_BAD_REQUEST)
            request.data['owner'] = owners

        blog_serializer = BlogSerializer(blog, data=request.data, partial=True)

        if blog_serializer.is_valid():
            blog_serializer.save()

            #accept invites
            if 'accepted_invites' in request.data:
                for client_id in request.data['accepted_invites']:
                    client = get_object_or_404(Client, id=client_id)
                    blog.subs.add(client.id)
                    blog.invites.remove(client.id)
                blog.save()
            # do not let a owner unsubscribe from his blog
            if 'subs' in request.data:
                if req_client.id not in request.data['subs']:
                    blog.subs.add(req_client)
                    blog.save()

            data = {"client": blog_serializer.data}
        else:
            return Response(blog_serializer.errors, status=HTTP_400_BAD_REQUEST)

        return Response(data)

    def delete(self, request):
        req_client = get_object_or_404(Client, user=request.user)

        num = request.GET.get('id', None)
        if num is not None:
            blog = Blog.objects.get(id=num)
        else:
            return Response({"error": "blog id not provided"}, status=HTTP_400_BAD_REQUEST)

        # check if it's a personal blog
        if Topic.objects.get(name="Personal") in blog.topic.all():
            return Response({"error": "Can't delete your personal blog"}, status=HTTP_400_BAD_REQUEST)

        # check for permissions
        if req_client not in blog.owner.all():
            return Response({"error": "not enough permissions"}, status=HTTP_401_UNAUTHORIZED)

        blog.delete()
        return Response({'success': 'successfully deleted the blog'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def topics(request):
    return Response(TopicSerializer(Topic.objects.all(), many=True).data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_post(request):
    # data is passed as a string and needs to be converted to a dict
    data = json.loads(request.data['data'])
    client = get_object_or_404(Client, user=request.user)

    if request.data.get('file'):
        data['image'] = request.data['file']

    if 'blog' in data:
        blog = get_object_or_404(Blog, id=data['blog'])
    else:
        topic = Topic.objects.get(name="Personal")
        blog = Blog.objects.get(topic=topic, owner__in=[client])
        data.update({'blog': blog.id})


    # check permissions to create new post on this blog
    if not blog.isPublic and client not in blog.subs.all():
        data = {'error': 'not enough permissions'}
    else:
        data.update({'client': client.id})
        post_serializer = PostSerializer(data=data)

        if post_serializer.is_valid():
            post_serializer.save()
            data = {'success': 'successfully created a new post', 'post': post_serializer.data}
        else:
            data = post_serializer.errors

    return Response(data)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def blog_follow(request):
    client = get_object_or_404(Client, user=request.user)

    data = request.data
    blog = get_object_or_404(Blog, id=data['blog'])

    if client in blog.owner.all():
        data = {'error': "Can't follow/unfollow a blog that you own."}
    elif client not in blog.subs.all():
        if blog.isPublic:
            data = {'success': 'Successfully followed this blog.'}
            blog.subs.add(client)
        else:
            data = {'success': 'Request sent to follow this blog.'}
            blog.invites.add(client)
        blog.save()
    else:
        data = {'success': 'Successfully unfollowed this blog.'}
        blog.subs.remove(client)
        blog.save()

    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request):
    client = get_object_or_404(Client, user=request.user)
    data = request.data
    post_id = data['post']
    post = get_object_or_404(Post, id=post_id)

    message = ""
    if client in post.likes.all():
        message = "Successfully removed like"
        post.likes.remove(client)
    else:
        message = "Successfully added like"
        post.likes.add(client)
    post.save()

    return Response({"success": message, 'post': PostSerializer(post).data})

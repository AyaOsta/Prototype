from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response

from responses.models import ResponseModel
from user.models import UserModel
from user.serializer import UserSerializer


# Create your views here.
class UserListView(generics.ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class MlMajorView(generics.GenericAPIView):
    def get(self, req: Request, pk):
        try:
            user = UserModel.objects.get(pk)
        except UserModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        responses = ResponseModel.objects.filter(user=user)

        ## todo feed the data to the ai

        return Response(status=status.HTTP_200_OK)

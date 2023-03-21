from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response

from user.models import UserModel
from user.serializer import UserSerializer


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

        # responses = ResponseModel.objects.filter(user=user)
        # response_array = []
        #
        # for response in responses:
        #     response_array.append(response)
        #
        # major = y_pred(response_array)
        # print(major)

        return Response(status=status.HTTP_200_OK)
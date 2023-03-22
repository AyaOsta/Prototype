import pickle
from os.path import abspath

from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response

from responses.models import ResponseModel
from user.models import UserModel
from user.serializer import UserSerializer


class UserListView(generics.ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class MlMajorView(generics.GenericAPIView):

    def get(self, request: Request, pk):
        try:
            user = UserModel.objects.get(id=pk)
        except UserModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        q5 = ResponseModel.objects.filter(user=user, question__number=5).first()
        q6 = ResponseModel.objects.filter(user=user, question__number=6).first()
        q7 = ResponseModel.objects.filter(user=user, question__number=7).first()

        response_array = [[q5.text if q5 else '', q6.text if q6 else '', 'Yes', 'Yes']]

        print(response_array)

        model = pickle.load(open(abspath('user/model.pickle'), 'rb'))
        ohe = pickle.load(open(abspath('user/ohe.pickle'), 'rb'))
        major = model.predict(ohe.transform(response_array))

        try:
            return Response(major[0],status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_418_IM_A_TEAPOT)

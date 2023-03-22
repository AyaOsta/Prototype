import pickle

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

    def get(self, req: Request, pk):
        try:
            user = UserModel.objects.get(id=pk)
        except UserModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        print(user)
        model = pickle.load(open('model.pickle', 'rb'))
        ohe = pickle.load(open('ohe.pickle', 'rb'))

        q5 = ResponseModel.objects.filter(user=user, question__number=5).get('text')
        q6 = ResponseModel.objects.filter(user=user, question__number=6).get('text')
        # q7 = ResponseModel.objects.filter(user=user, question__number=7)
        response_array = [q5, q6, 'Yes', 'Yes']

        dataset =[response_array]
        major = model.predict(ohe.transfrom(dataset))
        print(major)

        return Response(status=status.HTTP_200_OK)

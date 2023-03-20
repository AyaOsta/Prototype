import rest_framework.serializers as serializers

from .models import ResponseModel


class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseModel
        fields = '__all__'

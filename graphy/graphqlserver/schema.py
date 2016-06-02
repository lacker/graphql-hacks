import graphene
from graphene import relay, resolve_only_args
from graphene.contrib.django import DjangoNode, DjangoObjectType

from .models import Photo as PhotoModel
from .models import User as UserModel

def get_user(_id):
  return UserModel.objects.get(id=_id)

def get_photo(_id):
  return PhotoModel.objects.get(id=_id)

  
class User(DjangoNode):

  class Meta:
    model = UserModel

  @classmethod
  def get_node(cls, id, info):
    return User(get_user(id))


schema = graphene.Schema(name='The Graphy Schema')

        
# See https://github.com/graphql-python/graphene/blob/master/examples/starwars_django/schema.py for what else this needs

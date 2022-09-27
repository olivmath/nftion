# pylint: disable=unused-argument

from fastapi.testclient import TestClient
from nftion.main import app

def before_feature(context, feature):
    context.client = TestClient(app)

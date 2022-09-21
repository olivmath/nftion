from fastapi.testclient import TestClient
from auction.main import app

def before_feature(context, feature):
    context.client = TestClient(app)

from auction.main import app
from fastapi.testclient import TestClient

def before_feature(context, feature):
    context.client = TestClient(app)

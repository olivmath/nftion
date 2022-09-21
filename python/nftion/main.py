from nftion.api.home import hello
from nftion import app

app.include_router(hello.router)

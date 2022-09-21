# pylint: disable=no-name-in-module

from nftion.api.auction import open_auctions
from nftion import app

app.include_router(open_auctions.router)

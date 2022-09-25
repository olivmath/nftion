# pylint: disable=no-name-in-module

from nftion.api.auction import closed_auctions
from nftion.api.auction import open_auctions
from nftion.api.auction import all_auctions
from nftion import app

app.include_router(open_auctions.router)
app.include_router(closed_auctions.router)
app.include_router(all_auctions.router)

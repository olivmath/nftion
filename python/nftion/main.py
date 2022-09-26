# pylint: disable=no-name-in-module

# auction routes
from nftion.api.auction import closed_auctions
from nftion.api.auction import open_auctions
from nftion.api.auction import all_auctions
from nftion.api.auction import nft_auction

# seller routes
from nftion.api.seller import open_auction
from nftion.api.seller import closed_auction

from nftion import app

app.include_router(open_auctions.router)
app.include_router(closed_auctions.router)
app.include_router(all_auctions.router)
app.include_router(nft_auction.router)

# app.include_router(open_auction.router)
# app.include_router(closed_auction.router)

# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router
from nftion.database.db import all_auctions


@router.get(
    path="/open/",
    description="Show all open NFT auctions",
    status_code=status.HTTP_200_OK
)
async def open_nft():
    """
    # return all open nft auctions id

    - the id is same of nft id
    """
    return [
        auction.nft_id
        for auction in all_auctions.auctions
        if auction._open is True
    ]

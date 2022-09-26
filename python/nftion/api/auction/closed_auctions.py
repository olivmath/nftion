# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router
from nftion.database.db import all_auctions


@router.get(
    path="/closed/",
    description="Show all closed NFT auctions",
    status_code=status.HTTP_200_OK
)
async def closed_nft():
    """
    # return all closed nft auctions id

    - the id is same of nft id
    """

    return [
        auction.nft_id
        for auction in all_auctions.auctions
        if auction._open is not True
    ]

# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router
from nftion.database.db import all_auctions
from nftion.models.auction import Auction


@router.get(
    path="/{nft_id}/",
    description="Show all open NFT auctions",
    status_code=status.HTTP_200_OK,
    response_model=Auction
)
async def open_nft(nft_id: str):
    """
    # return all open nft auctions id

    - the id is same of nft id
    """

    auction = [
        auction
        for auction in all_auctions.auctions
        if auction.nft_id == nft_id
    ]
    if len(auction) == 0:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "NFT auction not found"}
        )
    else:
        return auction[0]

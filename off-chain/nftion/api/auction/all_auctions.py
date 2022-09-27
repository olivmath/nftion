# pylint: disable=protected-access

from fastapi import status
from nftion.api.auction import router
from nftion.database.db import all_auctions


@router.get(
    path="/",
    description="Show all open NFT auctions",
    status_code=status.HTTP_200_OK
)
async def all_nft():
    """
    # return all open and closed nft auctions id

    - the id is same of nft id
    """

    return [
        {
            "id": auction.nft_id,
            "open": auction._open
        }
        for auction in all_auctions.auctions
    ]

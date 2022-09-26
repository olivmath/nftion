from nftion.database.db import all_auctions
from nftion.api.auction import router
from fastapi import status


@router.get(
    path="/closed",
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
        if auction._open is not True  # pylint: disable=protected-access
    ]

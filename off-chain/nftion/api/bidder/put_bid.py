from nftion.validation.bidder import add_new_bid
from nftion.api.auction import router
from nftion.models.bidder import Bid
from fastapi.responses import JSONResponse
from fastapi import status


@router.post(
    path="/{nft_id}",
    description="Show all open NFT auctions",
    status_code=status.HTTP_201_CREATED
)
async def put_bid(nft_id: str, bid: Bid):
    """
    # put a new bid to open nft auction
    """

    if (response := add_new_bid(bid, nft_id)) is None:
        return bid
    else:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={
                "message": f"{bid.amount} is insufficient, bid must be greater than {response}",
            }
        )

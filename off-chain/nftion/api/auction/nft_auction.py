from nftion.database.db import all_auctions
from nftion.api.auction import router
from fastapi.responses import JSONResponse
from fastapi import status


@router.get(
    path="/{nft_id}",
    description="Show all open NFT auctions",
    status_code=status.HTTP_200_OK
)
async def open_nft(nft_id: str):
    """
    # return specific open nft auction

    ## Auction have
        - nft_id
        - initial_price
        - seller
        - signature
        - bids
            - bidder
            - bid
            - signature
    """

    auction = [
        auction
        for auction in all_auctions.auctions
        if auction.nft_id == nft_id
    ]
    if len(auction) == 0:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": f"{nft_id} NFT auction not found"}
        )
    else:
        return auction[0]

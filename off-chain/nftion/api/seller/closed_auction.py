# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router
from nftion.models.seller import CloseAuction
from nftion.validation.seller import close_auction


@router.post(
    path="/closed",
    description="Open new NFT auction",
    status_code=status.HTTP_200_OK
)
async def closed_nft_auction(nft_auction: CloseAuction):
    """
    # close nft auctions
    """

    print(nft_auction)

    if (response := close_auction(nft_auction)):
        return response
    else:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={
                "message": "Invalid NFT auction"
            }
        )

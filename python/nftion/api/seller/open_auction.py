# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router
from nftion.models.seller import NewAuction


@router.post(
    path="/open",
    description="Open new NFT auction",
    status_code=status.HTTP_201_CREATED
)
async def open_new_nft_auction(nft_auction: NewAuction):
    """
    # open a new nft auctions

    - the id is same of nft id
    """
    from nftion.validation.seller import open_new_auction

    if (response := open_new_auction(nft_auction)):
        return response
    else:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={
                "message": "Invalid NFT auction",
            }
        )

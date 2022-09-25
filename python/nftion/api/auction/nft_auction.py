# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.validation.auction import find_auction
from nftion.api.auction import router
from pydantic import BaseModel, Field
from typing import List


class OpenAuctions(BaseModel):
    """
    # Open Auctions model response
    """
    open: List[str] = Field(..., description="0xac")


@router.get(
    path="/{nft_id}/",
    description="Show all open NFT auctions",
    status_code=status.HTTP_200_OK,
    response_model=OpenAuctions
)
async def open_nft(nft_id: str):
    """
    # return all open nft auctions id

    - the id is same of nft id
    """
    auction = find_auction(nft_id)

    if auction['status'] == ('open' or 'closed'):
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=auction
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content=auction
        )
        
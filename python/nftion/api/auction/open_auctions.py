# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router
from nftion.database.db import all_auctions
from pydantic import BaseModel, Field
from typing import List


class OpenAuctions(BaseModel):
    """
    # Open Auctions model response
    """
    open: List[str] = Field(..., description="0xac")


@router.get(
    path="/open/",
    description="Show all open NFT auctions",
    status_code=status.HTTP_200_OK,
    response_model=OpenAuctions
)
async def open_nft():
    """
    # return all open nft auctions id

    - the id is same of nft id
    """

    open_auctions = OpenAuctions(
        open=list(map(
            lambda auction: auction.nft_id,
            all_auctions.open_auctions
        ))
    ).dict()

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=open_auctions
    )

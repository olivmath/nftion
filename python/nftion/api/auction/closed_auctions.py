# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router
from nftion.database.db import all_auctions
from typing import List
from pydantic import BaseModel, Field


class ClosedAuctions(BaseModel):
    """
    # Closed Auctions model response
    """
    closed: List[str] = Field(..., description="0xac")


@router.get(
    path="/closed/",
    description="Show all closed NFT auctions",
    status_code=status.HTTP_200_OK,
    response_model=ClosedAuctions
)
async def closed_nft():
    """
    # return all closed nft auctions id

    - the id is same of nft id
    """

    closed_auction = ClosedAuctions(
        closed=list(map(
            lambda auction: auction.nft_id,
            all_auctions.closed_auctions
        ))
    ).dict()

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=closed_auction
    )

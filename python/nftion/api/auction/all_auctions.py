# pylint: disable=no-name-in-module
# pylint: disable=too-few-public-methods

from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router
from nftion.database.db import all_auctions
from typing import List
from pydantic import BaseModel, Field


class AllAuctions(BaseModel):
    """
    # All NFT auctions
    """
    open: List[str] = Field(..., description="0xff")
    closed: List[str] = Field(..., description="0xac")


@router.get(
    path="/",
    description="Show all open NFT auctions",
    status_code=status.HTTP_200_OK,
    response_model=AllAuctions
)
async def all_nft():
    """
    # return all open and closed nft auctions id

    - the id is same of nft id
    """

    def nft_id(auction):
        return auction.nft_id

    auctions_open_closed_ids = AllAuctions(

        open=list(map(
            nft_id,
            all_auctions.open_auctions
        )),
        closed=list(map(
            nft_id,
            all_auctions.closed_auctions
        ))
    ).dict()

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=auctions_open_closed_ids
    )

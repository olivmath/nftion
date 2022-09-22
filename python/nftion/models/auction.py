# pylint: disable=too-few-public-methods
# pylint: disable=no-name-in-module
# pylint: disable=no-self-argument

from nftion.models.bid import Bid
from pydantic import BaseModel
from typing import List


class Auction(BaseModel):
    """
    # Auction of a NFT
    """
    init_price: int
    bids: List[Bid]
    nft_id: str
    seller: str

    def add_new_bid(cls, new_bid: Bid):
        if cls.bids[0].bid >= new_bid.bid:
            raise Exception(
                f"{new_bid.bid} is insufficient, bid more than {cls.bids[0].bid}"
            )
        cls.bids.insert(0, new_bid)

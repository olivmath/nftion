# pylint: disable=too-few-public-methods
# pylint: disable=no-name-in-module
# pylint: disable=no-self-argument

from typing import List
from pydantic import BaseModel


class Seller(BaseModel):
    """
    # Mock NFT Seller
    """
    prvk: str = "0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f"
    addr: str = "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA"
    initial_price: int = 10


class Bid(BaseModel):
    """
    # Bid
    """
    bid: int
    bidder: str
    signature: str

    # @validator("*")
    # def validate_signature(cls, v) -> bool:
    #     return v
    # @validator("*")
    # def validate_approved_by_contract(cls, v) -> bool:
    #     return v
    # @validator("*")
    # def validate_balance_of_bidder(cls, v) -> bool:
    #     return v
    # @validator("*")
    # def validate_allowance_of_bidder(cls, v) -> bool:
    #     return v


class Auction(BaseModel):
    """
    # Auction of a NFT
    """
    init_price: int
    seller: str
    nft_id: str
    signature: str
    bids: List[Bid]

    def __init__(
        self,
        **kwargs
    ) -> None:
        kwargs['bids'] = [Bid(
            bid=kwargs['init_price'],
            bidder=kwargs['seller'],
            signature=kwargs['signature']
        )]
        super().__init__(**kwargs)

    def add_new_bid(cls, new_bid: Bid):
        if cls.bids[0].bid >= new_bid.bid:
            raise Exception(
                f"{new_bid.bid} is insufficient, bid more than {cls.bids[0].bid}"
            )
        cls.bids.insert(0, new_bid)


class AuctionsOpenClosed(BaseModel):
    """
    # All Auction open and closed
    """
    open_auctions: List[Auction]
    closed_auctions: List[Auction]

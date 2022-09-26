# pylint: disable=too-few-public-methods
# pylint: disable=no-name-in-module
# pylint: disable=no-self-argument

from typing import List
from pydantic import BaseModel, PrivateAttr


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
        - initial_price: int
        - seller: str
        - nft_id: str
        - signature: str
        - open: bool
    """
    initial_price: int
    seller: str
    nft_id: str
    signature: str
    bids: List[Bid]
    _open: bool = PrivateAttr()

    def __init__(
        self,
        initial_price: int,
        seller: str,
        nft_id: str,
        signature: str,
        **kwargs
    ) -> None:
        kwargs['bids'] = []
        kwargs['initial_price']: int = initial_price
        kwargs['seller']: str = seller
        kwargs['nft_id']: str = nft_id
        kwargs['signature']: str = signature
        super().__init__(**kwargs)
        self._open: bool = True

    def add_new_bid(cls, new_bid: Bid):
        if cls.bids[0].bid >= new_bid.bid:
            raise Exception(
                f"{new_bid.bid} is insufficient, bid more than {cls.bids[0].bid}"
            )
        cls.bids.insert(0, new_bid)


class Auctions(BaseModel):
    """
    # All Auction open and closed
    """
    auctions: List[Auction]

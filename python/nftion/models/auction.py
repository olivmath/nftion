# pylint: disable=too-few-public-methods
# pylint: disable=no-name-in-module
# pylint: disable=no-self-argument

from pydantic import BaseModel, PrivateAttr
from nftion.models.bidder import Bid
from typing import List


class Seller(BaseModel):
    """
    # Mock NFT Seller
    """
    prvk: str = "0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f"
    addr: str = "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA"
    initial_price: int = 10


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
    _end_price: int = PrivateAttr()
    _bidder: str = PrivateAttr()

    def __init__(
        self,
        initial_price: int,
        seller: str,
        nft_id: str,
        signature: str,
        **kwargs
    ) -> None:
        kwargs['bids'] = [
            Bid(amount=initial_price, bidder=seller, signature=signature)
        ]
        kwargs['initial_price']: int = initial_price
        kwargs['seller']: str = seller
        kwargs['nft_id']: str = nft_id
        kwargs['signature']: str = signature
        super().__init__(**kwargs)
        self._open: bool = True
        self._end_price: int = 0

    def add_new_bid(cls, new_bid: Bid):
        if cls.bids[0].bid >= new_bid.bid:
            raise Exception(
                f"{new_bid.bid} is insufficient, bid more than {cls.bids[0].bid}"
            )
        cls.bids.insert(0, new_bid)

    def close(cls):
        cls._end_price = max(bid.amount for bid in cls.bids)
        cls._open = False
        cls._bidder = [
            bid.bidder
            for bid in cls.bids
            if bid.amount == cls._end_price
        ][0]


class Auctions(BaseModel):
    """
    # All Auction open and closed
    """
    auctions: List[Auction]

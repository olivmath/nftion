from nftion.models.bidder import Bid
from nftion.database.db import all_auctions
from typing import Optional


def add_bid(bid: Bid, nft_id: str) -> Optional[int]:
    for auction in all_auctions.auctions:
        if auction.nft_id == nft_id:
            return auction.add_new_bid(bid)
    return None


def validate_signature(signature: str, address: str, message: str) -> bool:
    return True


def add_new_bid(bid: Bid, nft_id: str) -> Optional[Bid]:
    if not validate_signature(bid.signature, bid.bidder, str(bid.amount)):
        return None
    return add_bid(bid, nft_id)

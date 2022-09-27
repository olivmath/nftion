from nftion.models.seller import NewAuction
from nftion.models.auction import Auction
from typing import Optional


def create_new_auction(auction: NewAuction) -> Auction:
    from nftion.database.db import all_auctions

    new_auction = Auction(
        initial_price=auction.initial_price,
        seller=auction.seller,
        nft_id=auction.nft_id,
        signature=auction.signature
    )
    all_auctions.auctions.append(new_auction)
    return new_auction


def close_nft_auction(nft_id: str) -> Optional[Auction]:
    from nftion.database.db import all_auctions

    # check:
    # - balance
    # - allowance
    # call smart-contract for swap

    for auction in all_auctions.auctions:
        if auction.nft_id == nft_id:
            auction.close()
            return auction

    return None


def validate_signature(signature: str, address: str, message: str) -> bool:
    return True


def validate_nft_auction(nft_id: str) -> bool:
    from nftion.database.db import all_auctions
    # pylint: disable=protected-access

    auction = [
        auction.nft_id
        for auction in all_auctions.auctions
        if auction.nft_id == nft_id
    ]

    if len(auction) == 0:
        return False
    else:
        return True


def validate_approve(address: str, nft_id: str) -> bool:
    # validate approve
    # get contract using <ABI | ContractAddress | Provider>
    # call function `approve` of contract
    # validate response of contract
    return True


def open_new_auction(auction: NewAuction) -> Optional[Auction]:
    if not validate_signature(
        auction.signature,
        auction.seller,
        str(auction.initial_price)
    ):
        return None
    elif validate_nft_auction(auction.nft_id):
        return None
    elif not validate_approve(auction.seller, auction.nft_id):
        return None
    else:
        return create_new_auction(auction)


def close_auction(auction: Auction) -> Optional[Auction]:
    if not validate_signature(
        auction.signature,
        auction.seller,
        str(auction.end_price)
    ):
        return None
    if not validate_nft_auction(auction.nft_id):
        return None
    return close_nft_auction(auction.nft_id)

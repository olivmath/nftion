from nftion.database.db import all_auctions


def auction_by_id(nft_id: str):
    def search_nft(auction):
        return auction.nft_id == nft_id

    if (nft_open := list(filter(
        search_nft,
        all_auctions.open_auctions
    ))):
        print(nft_open)
        return {
            "status": "open",
            "message": f"{nft_id} NFT Auction is open",
            "auction": nft_open[0].dict()
        }
    elif (nft_closed := list(filter(
        search_nft,
        all_auctions.closed_auctions
    ))):
        return {
            "status": "closed",
            "message": f"{nft_id} NFT Auction is closed",
            "auction": nft_closed[0].dict()
        }
    else:
        return {
            "status": "unknown",
            "message": f"{nft_id} NFT auction is not found",
            "auction": [nft_id]
        }


def find_auction(nft_id: str):
    return auction_by_id(nft_id)

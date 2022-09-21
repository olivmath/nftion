from nftion.database.db import AllAuctions


def get_all_auctions():
    return {
        "open": list(map(lambda i: i.nft_id, AllAuctions.open_auctions)),
        "closed": list(map(lambda i: i.nft_id, AllAuctions.closed_auctions))
    }


def auction_by_id(nft_id: str):
    nft_closed = list(filter(lambda i: i.nft_id == nft_id, AllAuctions.closed_auctions))
    nft_open = list(filter(lambda i: i.nft_id == nft_id, AllAuctions.open_auctions))

    if nft_closed is None and nft_open is None:
        raise Exception(f"{nft_id} NFT Auction not found")

    if nft_closed is not None:
        return {
            "status": "closed",
            "response": {
                "message": f"{nft_id} NFT Auction is closed",
                "auction": nft_closed
            }
        }

    return {
        "status": "open",
        "response": {
            "message": f"{nft_id} NFT Auction is open",
            "auction": nft_open
        }
    }


def find_auction(nft_id: str):
    auction = auction_by_id(nft_id)

    if auction["status"] != "open":
        raise Exception(f"{nft_id} is already closed")

    return auction['response']['auction']

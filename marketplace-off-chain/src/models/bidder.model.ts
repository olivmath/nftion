import { findAuction } from "../validation/auction.check"
import { Bid } from "./bid.model"

export const addNewBidByBidder = (
    signature: string,
    bidder: string,
    bid: number,
    nftId: string
) => {
    const nftAuction = findAuction(nftId)
    const receivedBid = new Bid(signature, bidder, bid)

    nftAuction.addNewBid(receivedBid)
    return {
        yourBidIndex: nftAuction.bids.findIndex(
            (bid) => bid.addr == receivedBid.addr
        )
    }
}

export const removeBidByBidder = (
    signature: string,
    bidder: string,
    bid: number,
    nftId: string
) => {
    const nftAuction = findAuction(nftId)

    const index = nftAuction.bids.findIndex(
        (currentBid) =>
            currentBid.addr == bidder &&
            currentBid.bid == bid &&
            currentBid.signature == signature
    )
    const removedBid = nftAuction.bids[index]
    nftAuction.bids.splice(index, 1)
    return {
        seller: nftAuction.seller,
        nftId: nftAuction.nftId,
        yourBid: removedBid.bid,
        bidder: removedBid.addr,
        signature: removedBid.signature
    }
}

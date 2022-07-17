import { Bid } from "../models/bid.model"
import { addNewBidByBidder, removeBidByBidder } from "../models/bidder.model"
import { findAuction } from "./auction.check"
import { validateSignature, validationData } from "./utils"

const validateBid = (
    signature: string,
    bidder: string,
    bid: number,
    nftId: string
) => {
    const nftAuction = findAuction(nftId)
    if (
        nftAuction.bids.findIndex(
            (currentBid) =>
                currentBid.addr == bidder &&
                currentBid.bid == bid &&
                currentBid.signature == signature
        ) == -1
    ) {
        throw new Error(`Bid price: ${bid} of bidder: ${bidder} not found`)
    }
}

export const addNewBid = (
    signature: string,
    bidder: string,
    bid: number,
    nftId: string
) => {
    validationData("not found params: `signature`, `bidder`, `bid`, `nftId`", [
        signature,
        bidder,
        bid,
        nftId
    ])
    validateSignature(signature, bidder, bid.toString())

    return addNewBidByBidder(signature, bidder, bid, nftId)
}

export const removeBidFromAuction = (
    signature: string,
    bidder: string,
    bid: number,
    nftId: string
) => {
    validationData("not found params: `signature`, `bidder`, `bid`, `nftId`", [
        signature,
        bidder,
        bid,
        nftId
    ])
    validateSignature(signature, bidder, bid.toString())
    validateBid(signature, bidder, bid, nftId)

    return removeBidByBidder(signature, bidder, bid, nftId)
}

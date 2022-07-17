import { Bid } from "../models/bid.model"
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

    const nftAuction = findAuction(nftId)
    const receivedBid = new Bid(signature, bidder, bid)

    nftAuction.addNewBid(receivedBid)
    return {
        yourBidIndex: nftAuction.bids.findIndex(
            (bid) => bid.addr == receivedBid.addr
        )
    }
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

    const nftAuction = findAuction(nftId)

    const index = nftAuction.bids.findIndex(
        (currentBid) => currentBid.addr == bidder && currentBid.bid == bid
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

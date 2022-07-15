import { validateSignature } from "./utils"
import { allAuctions } from "../database/db"
import { Auction } from "../models/auction"
import { auctionById, findAuction } from "./auction.check"

const validationData = (
    signature: string,
    initPrice: number,
    seller: string,
    nftId: string
) => {
    if (
        signature == undefined ||
        initPrice == undefined ||
        seller == undefined ||
        nftId == undefined
    ) {
        throw new Error(
            "not found params: `signature`, `initPrice`, `seller`, `nftId`"
        )
    }
}

export const openAuction = (
    signature: string,
    initPrice: number,
    seller: string,
    nftId: string
) => {
    validationData(signature, initPrice, seller, nftId)
    validateSignature(signature, initPrice.toString(), seller)
    const newAuction = new Auction(signature, initPrice, seller, nftId)
    allAuctions.open.push(newAuction)
    return newAuction
}

export const closeAuction = (
    signature: string,
    initPrice: number,
    seller: string,
    nftId: string
) => {
    validationData(signature, initPrice, seller, nftId)
    validateSignature(signature, initPrice.toString(), seller)
    const auction = auctionById(nftId)
    if (auction.status != "open") {
        throw new Error(`${nftId} is already closed or not found`)
    } else {
        const auction = allAuctions.open.filter(
            (auction) => auction.nftId == nftId
        )[0]
        allAuctions.closed.push(auction)
        const index = allAuctions.open.findIndex(
            (auction) => auction.nftId == nftId
        )
        allAuctions.open.splice(index, 1)

        const maxBid = Math.max(...auction.bids.map((bid) => bid.bid))
        const bidder = auction.bids.filter((bid) => bid.bid == maxBid)[0].addr
        return {
            seller: auction.seller,
            nftId: auction.nftId,
            initPrice: auction.initPrice,
            endPrice: maxBid,
            bidder: bidder
        }
    }
}

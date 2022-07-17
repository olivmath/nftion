import { validateSignature, validationData } from "./utils"
import { allAuctions } from "../database/db"
import { Auction } from "../models/auction.model"
import { auctionById } from "./auction.check"

const validateNFT = (nft: string) => {
    if (allAuctions.open.find((auction) => auction.nftId == nft) != undefined) {
        throw new Error(`nft: ${nft} is already opened`)
    } else if (
        allAuctions.closed.find((auction) => auction.nftId == nft) != undefined
    ) {
        throw new Error(`nft: ${nft} is already created and closed`)
    }
}

export const openAuction = (
    signature: string,
    initPrice: number,
    seller: string,
    nftId: string
) => {
    validationData(
        "not found params: `signature`, `initPrice`, `seller`, `nftId`",
        [signature, initPrice, seller, nftId]
    )
    validateSignature(signature, seller, initPrice.toString())
    validateNFT(nftId)

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
    validationData(
        "not found params: `signature`, `initPrice`, `seller`, `nftId`",
        [signature, initPrice, seller, nftId]
    )
    validateSignature(signature, seller, initPrice.toString())
    const auction = auctionById(nftId)
    if (auction.status == "noFound") {
        throw new Error(`${nftId} not found`)
    } else if (auction.status == "closed") {
        throw new Error(`${nftId} closed`)
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

import { auctionById } from "../validation/auction.check"
import { allAuctions } from "../database/db"
import { Auction } from "./auction.model"

export const openNFTAuctionBySeller = (
    signature: string,
    initPrice: number,
    seller: string,
    nftId: string
) => {
    const newAuction = new Auction(signature, initPrice, seller, nftId)
    allAuctions.open.push(newAuction)
    return newAuction
}

export const closeNFTAuctionBySeller = (nftId: string) => {
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

        // check:
        //  - balance
        //  - allowance
        // call smart-contract for swap

        return {
            seller: auction.seller,
            nftId: auction.nftId,
            initPrice: auction.initPrice,
            endPrice: maxBid,
            bidder: bidder
        }
    }
}

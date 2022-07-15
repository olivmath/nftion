import { allAuctions } from "../database/db"

export const getAllAuctions = () => {
    return {
        open: allAuctions.open.map((i) => i.nftId),
        closed: allAuctions.closed.map((i) => i.nftId)
    }
}

export const auctionById = (nftId: string) => {
    const nftClosed = allAuctions.closed.filter((nft) => nft.nftId == nftId)[0]
    const nftOpen = allAuctions.open.filter((nft) => nft.nftId == nftId)[0]

    if (nftClosed == undefined && nftOpen == undefined) {
        throw new Error(`${nftId} NFT Auction not found`)
    }

    if (nftClosed != undefined) {
        return {
            status: "closed",
            response: {
                message: `${nftId} NFT Auction is closed`,
                auction: nftClosed
            }
        }
    } else {
        return {
            status: "open",
            response: {
                message: `${nftId} NFT Auction is open`,
                auction: nftOpen
            }
        }
    }
}

export const findAuction = (nftId: string) => {
    const auction = auctionById(nftId)

    if (auction.status != "open") {
        throw new Error(`${nftId} is already closed or not found`)
    } else {
        return {
            seller: auction.response.auction.seller,
            nftId: auction.response.auction.nftId,
            initPrice: auction.response.auction.initPrice,
            bids: auction.response.auction.bids
        }
    }
}

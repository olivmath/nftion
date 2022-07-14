import { Router } from "express"
import { allAuctions } from "./db/ controler"
import { Auction, Bid } from "./db/db"

const router = Router()

const nftStatus = (nftId: string) => {
    const nftIsOpen = allAuctions.open.find((nft) => nft.nftId == nftId)
    const nftIsClosed = allAuctions.closed.find((nft) => nft.nftId == nftId)

    if (nftIsClosed == undefined && nftIsOpen == undefined) {
        return "notFound"
    } else if (nftIsClosed != undefined) {
        return "closed"
    } else {
        return "open"
    }
}

const closedAuctions = router.get("/closed", (request, response) => {
    return response.status(200).json(allAuctions.closed.map((i) => i.nftId))
})

const openAuctions = router.get("/open", (request, response) => {
    return response.status(200).json(allAuctions.open.map((i) => i.nftId))
})

const auctionsStatus = router.get("/:nftId", (request, response) => {
    const nftId = request.params.nftId
    switch (nftStatus(nftId)) {
        case "open":
            return response
                .status(200)
                .json(allAuctions.open.find((nft) => nft.nftId == nftId))
        case "closed":
            return response.status(202).json({
                message: `${nftId} NFT Auction is closed`
            })
        default:
            return response.status(404).json({
                message: `${nftId} NFT Auction not found`
            })
    }
})

const newBid = router.post("/bid/:nftId", (request, response) => {
    const nftId = request.params.nftId
    const receivedBid: Bid = new Bid(
        request.body.signature,
        request.body.addr,
        request.body.bid
    )
    if (nftStatus(nftId) == "open") {
        const nftAuction: Auction = allAuctions.open.filter(
            (auction) => auction.nftId == nftId
        )[0]
        if (nftAuction.initPrice > receivedBid.bid) {
            return response.status(404).json({
                message: `${receivedBid.bid} is less than that initial price: ${nftAuction.initPrice}`
            })
        } else {
            nftAuction.addNewBid(receivedBid)
            return response.status(201).json({
                yourBid: nftAuction.bids.findIndex(bid => bid.addr == receivedBid.addr)
            })
        }
    } else {
        return response.status(404).json({
            message: `${nftId} NFT Auction is not available`
        })
    }
})

export { openAuctions, closedAuctions, auctionsStatus, newBid }

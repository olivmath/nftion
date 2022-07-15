import { Auction, Bid } from "../database/controler"
import { allAuctions } from "../database/db"
import { nftStatus } from "./auctions"
import { Router } from "express"

const router = Router()

const newBid = router.post("/bid/:nftId", (request, response) => {
    const [signature, bidder, bid] = [
        request.body.signature,
        request.body.bidder,
        request.body.bid
    ]
    if (signature == undefined || bidder == undefined || bid == undefined) {
        return response.status(404).json({
            message: "not found params: `signature`, `bidder`, `bid`"
        })
    }
    const nftId = request.params.nftId
    let receivedBid: Bid
    try {
        receivedBid = new Bid(signature, bidder, bid)
    } catch (e) {
        return response.status(404).json({
            message: (e as Error).message
        })
    }
    if (nftStatus(nftId) == "open") {
        const nftAuction: Auction = allAuctions.open.filter(
            (auction) => auction.nftId == nftId
        )[0]
        if (nftAuction.initPrice > receivedBid.bid) {
            return response.status(404).json({
                message: `${receivedBid.bid} is less than that initial price: ${nftAuction.initPrice}`
            })
        } else {
            try {
                nftAuction.addNewBid(receivedBid)
            } catch (e) {
                return response.status(404).json({
                    message: (e as Error).message
                })
            }
            return response.status(201).json({
                yourBid: nftAuction.bids.findIndex(
                    (bid) => bid.addr == receivedBid.addr
                )
            })
        }
    } else {
        return response.status(404).json({
            message: `${nftId} NFT Auction is not available`
        })
    }
})

export { newBid }

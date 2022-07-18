import { addNewBid, removeBidFromAuction } from "../../validation/bidder.check"
import { Router } from "express"

const router = Router()

const newBid = router.post("/bid/:nftId", async (request, response) => {
    try {
        return response
            .status(201)
            .json(
                addNewBid(
                    request.body.signature,
                    request.body.bidder,
                    request.body.bid,
                    request.params.nftId
                )
            )
    } catch (e) {
        console.error((e as Error).message)
        return response.status(404).json({
            message: (e as Error).message
        })
    }
})

const removeBid = router.delete("/bid/:nftId", async (request, response) => {
    try {
        return response
            .status(201)
            .json(
                removeBidFromAuction(
                    request.body.signature,
                    request.body.bidder,
                    request.body.bid,
                    request.params.nftId
                )
            )
    } catch (e) {
        console.error((e as Error).message)
        return response.status(404).json({
            message: (e as Error).message
        })
    }
})
export { newBid, removeBid }

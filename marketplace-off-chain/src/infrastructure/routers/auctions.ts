import { getAllAuctions, findAuction } from "../../validation/auction.check"
import { Router } from "express"

const router = Router()

const closedAuctions = router.get("/closed", (request, response) => {
    return response.status(200).json(getAllAuctions().closed)
})

const openAuctions = router.get("/open", (request, response) => {
    return response.status(200).json(getAllAuctions().open)
})

const auctionsStatus = router.get("/:nftId", (request, response) => {
    try {
        return response
            .status(200)
            .json(findAuction(request.params.nftId))
    } catch (e) {
        return response.status(404).json({
            message: (e as Error).message
        })
    }
})

export { openAuctions, closedAuctions, auctionsStatus }

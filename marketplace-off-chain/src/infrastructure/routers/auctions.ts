import { getAllAuctions, findAuction } from "../../validation/auction.check"
import { Router } from "express"

const router = Router()

const closedAuctions = router.get("/closed", async (request, response) => {
    return response.status(200).json(getAllAuctions().closed)
})

const openAuctions = router.get("/open", async (request, response) => {
    return response.status(200).json(getAllAuctions().open)
})

const auctionsStatus = router.get("/:nftId", async (request, response) => {
    try {
        return response.status(200).json(findAuction(request.params.nftId))
    } catch (e) {
        console.error((e as Error).message)
        return response.status(404).json({
            message: (e as Error).message
        })
    }
})

export { openAuctions, closedAuctions, auctionsStatus }

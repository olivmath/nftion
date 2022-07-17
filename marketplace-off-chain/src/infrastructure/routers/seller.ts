import { openAuction, closeAuction } from "../../validation/seller.check"
import { Router } from "express"

const router = Router()

const newAuction = router.post("/auction", (request, response) => {
    try {
        return response
            .status(201)
            .json(
                openAuction(
                    request.body.signature,
                    request.body.initPrice,
                    request.body.seller,
                    request.body.nftId
                )
            )
    } catch (e) {
        console.error((e as Error).message)
        return response.status(404).json({
            message: (e as Error).message
        })
    }
})

const closedAuction = router.delete(
    "/auction/:nftId",
    async (request, response) => {
        try {
            return response
                .status(201)
                .json(
                    closeAuction(
                        request.body.signature,
                        request.body.initPrice,
                        request.body.seller,
                        request.params.nftId
                    )
                )
        } catch (e) {
            console.error((e as Error).message)
            return response.status(404).json({
                message: (e as Error).message
            })
        }
    }
)
export { newAuction, closedAuction }

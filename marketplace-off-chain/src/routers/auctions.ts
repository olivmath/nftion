import { Router } from "express"
import { allAuctions } from "./db/ controler"

const router = Router()

const closedAuctions = router.get("/closed", (request, response) => {
    return response.status(200).json(allAuctions.closed.map((i) => i.nftId))
})
const openAuctions = router.get("/open", (request, response) => {
    return response.status(200).json(allAuctions.open.map((i) => i.nftId))
})

const nftAuctions = router.get("/:nftId", (request, response) => {
    const nftId = request.params.nftId
    const nftIsOpen = allAuctions.open.find((nft) => nft.nftId == nftId)
    const nftIsClosed = allAuctions.closed.find((nft) => nft.nftId == nftId)

    if (nftIsClosed == undefined && nftIsOpen == undefined) {
        response.status(404).json({
            message: `${nftId} NFT Auction not found`
        })
    } else if (nftIsClosed != undefined) {
        response.status(202).json({
            message: `${nftId} NFT Auction is closed`
        })
    } else {
        return response
            .status(200)
            .json(allAuctions.open.find((nft) => nft.nftId == nftId))
    }
})

export { openAuctions, nftAuctions, closedAuctions }

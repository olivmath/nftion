import { Router } from "express"
import { Auction, Bid } from "../database/controler"
import { allAuctions } from "../database/db"

const router = Router()

export const nftStatus = (nftId: string) => {
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

export { openAuctions, closedAuctions, auctionsStatus }

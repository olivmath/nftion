import { Auction } from "../database/controler"
import { allAuctions } from "../database/db"
import { Router } from "express"
import { ethers } from "ethers"
import { nftStatus } from "./auctions"

const router = Router()

const newAuction = router.post("/auction", (request, response) => {
    const [signature, initPrice, seller, nftId] = [
        request.body.signature,
        request.body.initPrice,
        request.body.seller,
        request.body.nftId
    ]
    if (
        signature == undefined ||
        initPrice == undefined ||
        seller == undefined ||
        nftId == undefined
    ) {
        return response.status(404).json({
            message:
                "not found params: `signature`, `initPrice`, `seller`, `nftId`"
        })
    }
    let newAuction: Auction
    try {
        newAuction = new Auction(signature, initPrice, seller, nftId)
    } catch (e) {
        return response.status(404).json({
            message: (e as Error).message
        })
    }
    allAuctions.open.push(newAuction)
    return response.status(201).json(newAuction)
})

const closedAuction = router.delete("/auction/:nftId", async (request, response) => {
    const [signature, seller, nftId] = [request.body.signature, request.body.seller, request.params.nftId]
    if (signature == undefined || seller == undefined || nftId == undefined) {
        return response.status(404).json({
            message: "not found params: `signature`, `seller`"
        })
    } else {
        if(nftStatus(nftId) == "open") {
            if(!ethers.utils.verifyMessage(nftId, signature) == seller) {
                throw new Error("Signature not valid")
            } else {
                allAuctions.closed.push(allAuctions.open.filter(auction => auction.nftId == nftId)[0])
                const index = allAuctions.open.findIndex(auction => auction.nftId == nftId)
                allAuctions.open.splice(index, 1)
                return response.status(201).json({
                    message: `${nftId} closed`
                })
            }
        } else {
            return response.status(404).json({
                message: `${nftId} is already closed or not found`
            })
        }
    }
})
export { newAuction, closedAuction }

import { validateSignature, validationData } from "./utils"
import { allAuctions } from "../database/db"
import {
    closeNFTAuctionBySeller,
    openNFTAuctionBySeller
} from "../models/seller.model"

const validateNFT = (nft: string) => {
    if (allAuctions.open.find((auction) => auction.nftId == nft) != undefined) {
        throw new Error(`nft: ${nft} is already opened`)
    } else if (
        allAuctions.closed.find((auction) => auction.nftId == nft) != undefined
    ) {
        throw new Error(`nft: ${nft} is already created and closed`)
    }
}

export const openAuction = (
    signature: string,
    initPrice: number,
    seller: string,
    nftId: string
) => {
    validationData(
        "not found params: `signature`, `initPrice`, `seller`, `nftId`",
        [signature, initPrice, seller, nftId]
    )
    validateSignature(signature, seller, initPrice.toString())
    validateNFT(nftId)

    return openNFTAuctionBySeller(signature, initPrice, seller, nftId)
}

export const closeAuction = (
    signature: string,
    initPrice: number,
    seller: string,
    nftId: string
) => {
    validationData(
        "not found params: `signature`, `initPrice`, `seller`, `nftId`",
        [signature, initPrice, seller, nftId]
    )
    validateSignature(signature, seller, initPrice.toString())

    return closeNFTAuctionBySeller(nftId)
}

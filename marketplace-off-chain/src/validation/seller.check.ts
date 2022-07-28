import { validateSignature, validationData } from "./utils"
import { allAuctions } from "../database/db"
import {
    closeNFTAuctionBySeller,
    openNFTAuctionBySeller
} from "../models/seller.model"

const validateApprove = (seller: string, nftId: string) => {
    // validate approve
    // get contract using <ABI | ContractAddress | Provider>
    // call function `approve` of contract
    // validate response of contract
}


const validateNFTAuction = (nft: string) => {
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
        "not found params: `signature`, `initPrice`, `seller`, `nftAddress`, `nftId`",
        [signature, initPrice, seller, nftId]
    )
    validateSignature(signature, seller, initPrice.toString())
    validateNFTAuction(nftId)
    validateApprove(seller, nftId)

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

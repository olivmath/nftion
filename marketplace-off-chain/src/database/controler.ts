import { ethers } from "ethers"

export class Bid {
    signature: string
    addr: string
    bid: number

    constructor(signature: string, addr: string, bid: number) {
        // validate signature before instantiate this class
        this.signatureValidate(signature, addr, bid.toString())
        // todo: validate approved by contract

        this.signature = signature
        this.addr = addr
        this.bid = bid
    }

    signatureValidate(signature: string, addr: string, message: string) {
        try {
            if (ethers.utils.verifyMessage(message, signature) == addr) {
                return true
            } else {
                throw new Error("Signature not valid")
            }
        } catch {
            throw new Error("Signature not valid")
        }
    }
}

export class Auction {
    initPrice: number
    bids: Array<Bid>
    nftId: string
    seller: string

    constructor(
        signature: string,
        initPrice: number,
        seller: string,
        nftId: string
    ) {
        this.bids = [new Bid(signature, seller, initPrice)]
        this.initPrice = initPrice
        this.seller = seller
        this.nftId = nftId
    }

    addNewBid(newBid: Bid) {
        const currentBid = this.bids[0]

        if (currentBid.bid >= newBid.bid) {
            throw new Error(`Enought Bid, ${currentBid.bid}`)
        } else {
            this.bids.splice(0, 0, newBid)
        }
    }
}

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

    signatureValidate(
        signature: string,
        addr: string,
        message: string
    ): boolean {
        if (ethers.utils.verifyMessage(message, signature) == addr) {
            return true
        } else {
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
        seller: string,
        nftId: string,
        initPrice: number,
        signature: string
    ) {
        this.bids = [new Bid(signature, seller, initPrice)]
        this.initPrice = initPrice
        this.seller = seller
        this.nftId = nftId
    }

    addNewBid(newBid: Bid) {
        const currentBid = this.bids[0]

        if (currentBid.bid >= newBid.bid) {
            this.bids.push(newBid)
        } else {
            this.bids.splice(0, 0, newBid)
        }
    }
}
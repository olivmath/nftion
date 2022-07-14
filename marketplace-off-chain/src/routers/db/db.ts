import { ethers } from "ethers"

export class Bid {
    signature: string
    addr: string
    bid: number

    constructor(signature: string, addr: string, bid: number) {
        // validate signature before instantiate this class
        if(!this.signatureValidate(signature, addr, bid.toString())){
            throw new Error("Signature not valid");
        }
        // todo: validate approved by contract

        this.signature = signature
        this.addr = addr
        this.bid = bid
    }

    signatureValidate(signature: string, addr: string, message: string): boolean {
        // if(ethers.utils.verifyMessage(message, signature) == addr) {
        //     return true
        // } else {
        //     return false
        // }
        return true
    }
}

export class Auction {
    initPrice: number
    bids: Array<Bid>
    nftId: string

    constructor(nftId: string, initPrice: number) {
        this.bids = [new Bid("", "", initPrice)]
        this.initPrice = initPrice
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

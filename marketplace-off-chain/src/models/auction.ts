import { Bid } from "./bid"

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

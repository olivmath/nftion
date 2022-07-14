export class Bid {
    signature: string
    addr: string
    bid: number

    constructor(addr: string, bid: number, signature: string) {
        this.signature = signature
        this.addr = addr
        this.bid = bid
    }
}

export class Auction {
    initPrice: number
    bids: Array<Bid>
    nftId: string

    constructor(nftId: string, initPrice: number) {
        this.bids = [new Bid("", 0, "")]
        this.initPrice = initPrice
        this.nftId = nftId
    }

    addNewBid(addr: string, bid: number, signature: string) {
        const newBid = new Bid(addr, bid, signature)
        const currentBid = this.bids[0]

        if (currentBid.bid >= newBid.bid) {
            this.bids.push(newBid)
        } else {
            this.bids.splice(0, 0, newBid)
        }
    }
}

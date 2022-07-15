import { allAuctions } from "../database/db"
import { Bid } from "../models/bid"
import { findAuction } from "./auction.check"
import { validateSignature } from "./utils"

const validationData = (
    signature: string,
    bidder: string,
    bid: number,
    nftId: string
) => {
    if (
        signature == undefined ||
        bidder == undefined ||
        bid == undefined ||
        nftId == undefined
    ) {
        throw new Error(
            "not found params: `signature`, `bidder`, `bid`, `nftId`"
        )
    }
}

export const addNewBid = (
    signature: string,
    bidder: string,
    bid: number,
    nftId: string
) => {
    validationData(signature, bidder, bid, nftId)
    validateSignature(signature, bid.toString(), bidder)

    const nftAuction = findAuction(nftId)
    const maxBid = Math.max(...nftAuction.bids.map(bid => bid.bid))

    if (maxBid > bid) {
        throw new Error(`${bid} is less than that initial price: ${nftAuction.initPrice}`)
    }
    const receivedBid = new Bid(signature, bidder, bid)
    nftAuction.addNewBid(receivedBid)
    return {
        yourBidIndex: nftAuction.bids.findIndex((bid) => bid.addr == receivedBid.addr)
    }
}

// const [signature, bidder, bid] = [
//   request.body.signature,
//   request.body.bidder,
//   request.body.bid
// ]
// if (signature == undefined || bidder == undefined || bid == undefined) {
//   return response.status(404).json({
//       message: "not found params: `signature`, `bidder`, `bid`"
//   })
// }
// const nftId = request.params.nftId
// let receivedBid: Bid
// try {
//   receivedBid = new Bid(signature, bidder, bid)
// } catch (e) {
//   return response.status(404).json({
//       message: (e as Error).message
//   })
// }
// if (nftStatus(nftId) == "open") {
//   const nftAuction: Auction = allAuctions.open.filter(
//       (auction) => auction.nftId == nftId
//   )[0]
//   if (nftAuction.initPrice > receivedBid.bid) {
//       return response.status(404).json({
//           message: `${receivedBid.bid} is less than that initial price: ${nftAuction.initPrice}`
//       })
//   } else {
//       try {
//           nftAuction.addNewBid(receivedBid)
//       } catch (e) {
//           return response.status(404).json({
//               message: (e as Error).message
//           })
//       }
//       return response.status(201).json({
//           yourBid: nftAuction.bids.findIndex(
//               (bid) => bid.addr == receivedBid.addr
//           )
//       })
//   }
// } else {
//   return response.status(404).json({
//       message: `${nftId} NFT Auction is not available`
//   })
// }

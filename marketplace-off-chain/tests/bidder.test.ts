import { describe, expect, test } from "@jest/globals"
import { app } from "../src/infrastructure/app"
import request from "supertest"
import { ethers } from "ethers"

describe("Bidder routes", () => {
    const bidder = new ethers.Wallet(
        "0xc12d5fd82e11119cb6fdeaac20ad8b255fdb208b36d557dd816e2bfd8d831e0b"
    )
    const signMessage = async (msg: number) => {
        const signed = await bidder.signMessage(msg.toString())
        return signed
    }
    test("/bid/{nftId} 201 | should be return 0 if bid greater than the current bid", async () => {
        const bid = 100
        const payload = {
            bidder: bidder.address,
            bid: bid,
            signature: await signMessage(bid)
        }
        console.log(payload)
        const response = await request(app).post("/bid/0xff").send(payload)
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
            yourBidIndex: 0
        })
    })
    test("/bid/{nftId} 404 | should be fail if bid for less than the current bid", async () => {
        const bid = 1
        const payload = {
            bidder: bidder.address,
            bid: bid,
            signature: await signMessage(bid)
        }
        const response = await request(app).post("/bid/0xff").send(payload)
        expect(response.status).toEqual(404)
        expect(response.body).toEqual({
            message: "1 is insufficient, bid more than 100"
        })
    })
    test("/bid/{nftId} 201 | should be return removed bid of bidder", async () => {
        const putBid = async (bid: number) => {
            const payload = {
                bidder: bidder.address,
                bid: bid,
                signature: await signMessage(bid)
            }
            const response = await request(app).post("/bid/0xff").send(payload)
            expect(response.status).toEqual(201)
            expect(response.body).toEqual({
                yourBidIndex: 0
            })
        }
        await putBid(107)
        await putBid(701)

        const payload = {
            bidder: bidder.address,
            bid: 107,
            signature: await signMessage(107)
        }
        const response = await request(app).delete("/bid/0xff").send(payload)
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
            signature:
                "0x787cba2495f21c78f8fdc4086d3d21f9ad0e0ca2e9f08c633ea09d91123a27373d4bae84ff355ba244e3b1deed4df2205144aa96c938d241d3fa879f9fe18d221c",
            bidder: "0x0337752bce5c5FBf5906369B04555bb7f4040135",
            seller: "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA",
            nftId: "0xff",
            yourBid: 107
        })
    })
})

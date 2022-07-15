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
        const response = await request(app)
            .post("/bid/0xff")
            .send({
                bidder: bidder.address,
                bid: bid,
                signature: await signMessage(bid)
            })
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
            yourBidIndex: 0
        })
    })
    test("/bid/{nftId} 404 | should be fail if bid for less than the current bid", async () => {
        const bid = 1
        const response = await request(app)
            .post("/bid/0xff")
            .send({
                bidder: bidder.address,
                bid: bid,
                signature: await signMessage(bid)
            })
        expect(response.status).toEqual(404)
        expect(response.body).toEqual({
            message: "1 is less than that initial price: 10"
        })
    })
})

import { describe, expect, test } from "@jest/globals"
import { app } from "../src/app"
import request from "supertest"
import { ethers } from "ethers"

describe("GET routes", () => {
    test("/closed - 200 | should be return all nfts auctions closed", async () => {
        const response = await request(app).get("/closed")
        expect(response.status).toEqual(200)
        expect(response.body).toEqual(["0xaa"])
    })
    test("/open - 200 | should be return all nfts auctions open", async () => {
        const response = await request(app).get("/open")
        expect(response.status).toEqual(200)
        expect(response.body).toEqual(["0xff"])
    })
    test("/{nftId} - 200 | should be return all data about `0xff` NFT Auction", async () => {
        const response = await request(app).get("/0xff")
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            seller: "0x3A68dD01B4B118b07b3d018fD149Dc0D41097f75",
            nftId: "0xff",
            initPrice: 10,
            bids: [
                {
                    signature:
                        "0x6940fc5db660efb51e7943a987f65fa75b3e470ebc7e4979fcec080b8bff33462cc872fd72aaa6014966fd99a33f9bb13f49df46fa606e27e6d8483721bda3041c",
                    addr: "0x3A68dD01B4B118b07b3d018fD149Dc0D41097f75",
                    bid: 10
                }
            ]
        })
    })
    test("/{nftId} - 202 | should be return fail if `0xaa` NFT Auction is closed", async () => {
        const response = await request(app).get("/0xaa")
        expect(response.status).toEqual(202)
        expect(response.body).toEqual({
            message: "0xaa NFT Auction is closed"
        })
    })
    test("/{nftId} - 404 | should be return fail if `0xaa` NFT Auction is not found", async () => {
        const response = await request(app).get("/0x22")
        expect(response.status).toEqual(404)
        expect(response.body).toEqual({
            message: "0x22 NFT Auction not found"
        })
    })
})

describe("POST routes", () => {
    const bidder1 = new ethers.Wallet(
        "0xc12d5fd82e11119cb6fdeaac20ad8b255fdb208b36d557dd816e2bfd8d831e0b"
    )
    const signMessage = async (msg: number) => {
        const signed = await bidder1.signMessage(msg.toString())
        return signed
    }
    test("/bid/{nftId} 201 | should be return 0 if bid greater than the current bid", async () => {
        const bid = 100
        const response = await request(app)
            .post("/bid/0xff")
            .send({
                addr: bidder1.address,
                bid: bid,
                signature: await signMessage(bid)
            })
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
            yourBid: 0
        })
    })
    test("/bid/{nftId} 404 | should be fail if bid for less than the current bid", async () => {
        const bid = 1
        const response = await request(app)
            .post("/bid/0xff")
            .send({
                addr: bidder1.address,
                bid: bid,
                signature: await signMessage(bid)
            })
        expect(response.status).toEqual(404)
        expect(response.body).toEqual({
            message: "1 is less than that initial price: 10"
        })
    })
})

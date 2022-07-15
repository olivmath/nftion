import { describe, expect, test } from "@jest/globals"
import { app } from "../src/infrastructure/app"
import request from "supertest"

describe("Auction routes", () => {
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
            seller: "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA",
            nftId: "0xff",
            initPrice: 10,
            bids: [
                {
                    signature:
                        "0x3789e95fc86ca07d161c06dc95d5843f2b0a22457da570740703e10e8eb7ec626cd163aaab7d87d5f23074d0b5b13be7871582ffaf9c0c93cc4c49059c51d2161b",
                    addr: "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA",
                    bid: 10
                }
            ]
        })
    })
    test("/{nftId} - 202 | should be return fail if `0xaa` NFT Auction is closed", async () => {
        const response = await request(app).get("/0xaa")
        expect(response.status).toEqual(404)
        expect(response.body).toEqual({
            message: "0xaa is already closed or not found",
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

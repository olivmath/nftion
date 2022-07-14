import { app } from "../src/app"
import request from "supertest"

describe("GET routes", () => {
    test("/closed - 200 | should be all nfts auctions closed", async () => {
        const response = await request(app).get("/closed")
        expect(response.status).toEqual(200)
        expect(response.body).toEqual(["0xaa"])
    })
    test("/open - 200 | should be all nfts auctions open", async () => {
        const response = await request(app).get("/open")
        expect(response.status).toEqual(200)
        expect(response.body).toEqual(["0xff"])
    })
    test("/{nftId} - 200 | should be all data about `0xff` NFT Auction", async () => {
        const response = await request(app).get("/0xff")
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            nftId: "0xff",
            initPrice: 10,
            bids: [{ signature: "", addr: "", bid: 0 }]
        })
    })
    test("/{nftId} - 202 | should be fail if `0xaa` NFT Auction is closed", async () => {
        const response = await request(app).get("/0xaa")
        expect(response.status).toEqual(202)
        expect(response.body).toEqual({
            message: "0xaa NFT Auction is closed"
        })
    })
    test("/{nftId} - 404 | should be fail if `0xaa` NFT Auction is not found", async () => {
        const response = await request(app).get("/0x22")
        expect(response.status).toEqual(404)
        expect(response.body).toEqual({
            message: "0x22 NFT Auction not found"
        })
    })
})

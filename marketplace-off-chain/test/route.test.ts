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
            nftId: "0xff",
            initPrice: 10,
            bids: [{ signature: "", addr: "", bid: 10 }]
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
    const bidder1 = ethers.Wallet.createRandom("0x123")
    const signMessage = async (msg: number) => {
        return (await bidder1.signMessage(msg.toString())).toString()
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
            "message": "1 is less than that initial price: 10"
        })
    })
})

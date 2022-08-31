import { describe, expect, test } from "@jest/globals"
import { app } from "../src/infrastructure/app"
import request from "supertest"
import { ethers } from "ethers"

describe("Seller routes", () => {
    const seller = new ethers.Wallet(
        "0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f"
    )
    const signMessage = async (msg: string) => {
        const signed = await seller.signMessage(msg)
        return signed
    }
    test("POST /auction 201 | should be create a new acution", async () => {
        const initPrice = 100
        const payload = {
            initPrice: initPrice,
            seller: seller.address,
            nftId: "0xac",
            signature: await signMessage(initPrice.toString())
        }
        const response = await request(app).post("/auction").send(payload)
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
            seller: "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA",
            initPrice: 100,
            nftId: "0xac",
            bids: [
                {
                    addr: "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA",
                    bid: 100,
                    signature:
                        "0x4eef80e1959812b1bbef5ec4c5a5fc1d286376fa22b2301338fdd96767fc8d7d0b602d3f369f0dbbab772761d1522d840c09ecea75a153a6d04767124150f5181b"
                }
            ]
        })
    })

    test("POST /auction/{nftId} 201 | should be delete a auction", async () => {
        const open = await request(app).get("/open")
        expect(open.status).toEqual(200)
        expect(open.body.includes("0xff")).toEqual(true)
        const closed = await request(app).get("/closed")
        expect(closed.status).toEqual(200)
        expect(closed.body.includes("0xff")).toEqual(false)

        const payload = {
            seller: seller.address,
            initPrice: 10,
            signature: await signMessage("10")
        }
        const response = await request(app)
            .delete("/auction/0xff")
            .send(payload)
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
            seller: "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA",
            bidder: "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA",
            nftId: "0xff",
            initPrice: 10,
            endPrice: 10
        })

        const openAfter = await request(app).get("/open")
        expect(openAfter.status).toEqual(200)
        expect(openAfter.body.includes("0xff")).toEqual(false)

        const closedAfter = await request(app).get("/closed")
        expect(closedAfter.status).toEqual(200)
        expect(closedAfter.body.includes("0xff")).toEqual(true)
    })
})

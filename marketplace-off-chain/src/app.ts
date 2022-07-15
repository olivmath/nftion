import { newAuction } from "./routers/seller"
import { newBid } from "./routers/bidder"
import express from "express"
import {
    closedAuctions,
    auctionsStatus,
    openAuctions
} from "./routers/auctions"

const app = express()

app.use(express.json())
app.use(auctionsStatus)
app.use(closedAuctions)
app.use(openAuctions)
app.use(newAuction)
app.use(newBid)

export { app }

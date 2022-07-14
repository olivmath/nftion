import express from "express"
import {
    closedAuctions,
    auctionsStatus,
    openAuctions,
    newBid
} from "./routers/auctions"

const app = express()

app.use(express.json())
app.use(auctionsStatus)
app.use(closedAuctions)
app.use(openAuctions)
app.use(newBid)

export { app }

import express from "express"
import { openAuctions } from "./routers/auctions"

const app = express()

app.use(express.json())
app.use(openAuctions)

export { app }

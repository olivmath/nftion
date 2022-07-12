import express from "express"
import { hello } from "./routers/hello"

const app = express()

app.use(express.json())
app.use(hello)

export { app }

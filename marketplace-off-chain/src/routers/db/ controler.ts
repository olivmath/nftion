import { Auction } from "./db"

export const duckAuction = new Auction("0xff", 10)
export const monkeyAuction = new Auction("0xaa", 20)
export const allAuctions = {
    open: [duckAuction],
    closed: [monkeyAuction]
}

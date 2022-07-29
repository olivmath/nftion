import { ethers } from "ethers"

export class Bid {
    signature: string
    addr: string
    bid: number

    constructor(signature: string, addr: string, bid: number) {
        this.signatureValidate(signature, addr, bid.toString())
        // todo: validate approved by contract
        // todo: validate balance of bidder
        // todo: validate allowance of bidder

        this.signature = signature
        this.addr = addr
        this.bid = bid
    }

    signatureValidate(signature: string, addr: string, message: string) {
        try {
            if (ethers.utils.verifyMessage(message, signature) == addr) {
                return true
            } else {
                throw new Error("Signature not valid")
            }
        } catch {
            throw new Error("Signature not valid")
        }
    }
}

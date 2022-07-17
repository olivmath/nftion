import { ethers } from "ethers"

export class Bid {
    signature: string
    addr: string
    bid: number

    constructor(signature: string, addr: string, bid: number) {
        // validate signature before instantiate this class
        this.signatureValidate(signature, addr, bid.toString())
        // todo: validate approved by contract

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

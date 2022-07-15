import { ethers } from "ethers"

export const validateSignature = (
    signature: string,
    message: string,
    signer: string
) => {
    if (ethers.utils.verifyMessage(message.toString(), signature) != signer) {
        throw new Error("Signature not valid")
    }
}

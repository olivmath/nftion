import { ethers } from "ethers"

type Args = Array<string | number>

export const validateSignature = (
    signature: string,
    signer: string,
    message: string
) => {
    if (ethers.utils.verifyMessage(message.toString(), signature) != signer) {
        throw new Error("Signature not valid")
    }
}

export const validationData = (msgError: string, args: Args) => {
    if (args.filter((arg) => arg == undefined).length > 0) {
        throw new Error(msgError)
    }
}

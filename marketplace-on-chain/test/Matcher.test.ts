import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Matcher__factory, Matcher } from "../typechain-types"
import { ethers, ethers as hardhat } from "hardhat"
import { expect } from "chai"

describe("Matcher", () => {
    let matcher: Matcher
    let owner: SignerWithAddress
    let addr1: SignerWithAddress
    let addr2: SignerWithAddress
    let addrs: SignerWithAddress[]

    beforeEach(async () => {
        ;[owner, addr1, addr2, ...addrs] = await hardhat.getSigners()

        const matcherFactory = (await hardhat.getContractFactory(
            "Matcher",
            owner
        )) as Matcher__factory
        matcher = await matcherFactory.deploy()
    })

    describe("Signatures", () => {
        it("Should be return true for right signature", async () => {
            const message = ethers.utils.hashMessage("123")
            const signature = await owner.signMessage("123")

            expect(true).to.equal(
                await matcher.connect(owner).settle(message, signature)
            )
        })
        it("Should be return false for wrong signature", async () => {
            const message = ethers.utils.hashMessage("123")
            const signature = await owner.signMessage("123")

            expect(false).to.equal(
                await matcher.connect(addr1).settle(message, signature)
            )
        })
    })
})

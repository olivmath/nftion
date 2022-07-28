import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Duck__factory, Duck } from "../typechain-types"
import { ethers as hardhat } from "hardhat"
import { expect } from "chai"

describe("Duck NFT", function () {
    let DuckNFT: Duck
    let owner: SignerWithAddress
    let addr1: SignerWithAddress
    let addr2: SignerWithAddress
    let addrs: Array<SignerWithAddress>

    beforeEach(async function () {
        ;[owner, addr1, addr2, ...addrs] = await hardhat.getSigners()

        const DuckNFTFactory = (await hardhat.getContractFactory(
            "Duck",
            owner
        )) as Duck__factory
        DuckNFT = await DuckNFTFactory.deploy()
    })

    describe("Deployment", () => {
        it("Should return the right name and symbol", async () => {
            expect(await DuckNFT.name()).to.equal("Duck")
            expect(await DuckNFT.symbol()).to.equal("QUAK")
            expect(await DuckNFT.totalSupply()).to.equal(5)
        })
    })
    describe("Mint", () => {
        it("Should return the nftId and ", async () => {
            await expect(await DuckNFT.connect(owner).mintTo(addr1.address))
                .to.emit(DuckNFT, "Minted")
                .withArgs("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 0)
            const balance = await DuckNFT.connect(owner).balanceOf(
                addr1.address
            )
            expect(balance).to.equal(1)
        })
        it("Should be fail if more than 5 mint", async () => {
            const mint = async (addr: SignerWithAddress, nftId: number) => {
                await expect(await DuckNFT.connect(owner).mintTo(addr.address))
                    .to.emit(DuckNFT, "Minted")
                    .withArgs(addr.address, nftId)
            }
            await mint(addrs[0], 0)
            await mint(addrs[1], 1)
            await mint(addrs[2], 2)
            await mint(addrs[3], 3)
            await mint(addrs[4], 4)
            expect(await mint(owner, 5)).to.be.revertedWith(
                "Total supply fully"
            )
        })
    })
    describe("Transfer", () => {
        it("Should transfer NFT from addr1 to addr2", async () => {
            await DuckNFT.connect(owner).mintTo(addr1.address)
            expect(
                await DuckNFT.connect(owner).balanceOf(addr1.address)
            ).to.equal(1)
            await DuckNFT.connect(addr1).transferFrom(
                addr1.address,
                addr2.address,
                0
            )
            expect(
                await DuckNFT.connect(owner).balanceOf(addr2.address)
            ).to.equal(1)
        })
    })
    describe("Approve", () => {
        it("Should approve", async () => {
            await DuckNFT.connect(owner).mintTo(addr1.address)
            expect(
                await DuckNFT.connect(owner).balanceOf(addr1.address)
            ).to.equal(1)

            DuckNFT.connect(addr1).approve(addr2.address, 0)

            await DuckNFT.connect(addr2).transferFrom(
                addr1.address,
                addrs[2].address,
                0
            )
            expect(
                await DuckNFT.connect(owner).balanceOf(addrs[2].address)
            ).to.equal(1)
        })
    })
    describe("Allowency", () => {
        it("test A", async () => {
            await DuckNFT.connect(owner).mintTo(addr1.address)
            expect(
                await DuckNFT.connect(owner).balanceOf(addr1.address)
            ).to.equal(1)
        })
    })
})

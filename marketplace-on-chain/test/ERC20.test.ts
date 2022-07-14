import { expect } from "chai"
import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Lua__factory, Lua } from "../typechain-types"

describe("Token contract", function () {
    let luaToken: Lua
    let owner: SignerWithAddress
    let addr1: SignerWithAddress
    let addr2: SignerWithAddress
    let addrs: SignerWithAddress[]

    beforeEach(async function () {
        ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()

        const luaTokenFactory = (await ethers.getContractFactory(
            "Lua",
            owner
        )) as Lua__factory
        const totalSupply = (10 ** 9).toString()
        luaToken = await luaTokenFactory.deploy(
            ethers.utils.parseEther(totalSupply)
        )
    })

    describe("Deployment", function () {
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await luaToken.balanceOf(owner.address)
            expect(await luaToken.totalSupply()).to.equal(ownerBalance)
        })
    })

    describe("Transactions", function () {
        it("`owner` should send 100LUA to `addr1`", async function () {
            // `owner` send 100LUA to `addr1`
            await luaToken.connect(owner).transfer(addr1.address, 100)
            const addr1Balance = await luaToken.balanceOf(addr1.address)
            expect(addr1Balance).to.equal(100)
            // `addr1` send 10LUA to `addr2`
            await luaToken.connect(addr1).transfer(addr2.address, 10)
            const addr2Balance = await luaToken.balanceOf(addr2.address)
            expect(addr2Balance).to.equal(10)
        })

        it("`owner` must not send 100LUA to `addr1` because there is no balance", async function () {
            const initialOwnerBalance = await luaToken.balanceOf(owner.address)
            const addr1Balance = await luaToken.balanceOf(addr1.address)

            // init addr1 balance should be 0
            expect(await luaToken.balanceOf(addr1.address)).to.equal(
                addr1Balance
            )

            await expect(
                luaToken.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance")

            // Owner balance shouldn't have changed.
            expect(await luaToken.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            )
        })

        it("`owner` should not have the same balance as in the beginning", async function () {
            const initialOwnerBalance = await luaToken.balanceOf(owner.address)

            // Transfer 100 tokens from owner to addr1.
            await luaToken.transfer(addr1.address, 100)

            // Transfer another 50 tokens from owner to addr2.
            await luaToken.transfer(addr2.address, 50)

            // Check balances.
            const finalOwnerBalance = await luaToken.balanceOf(owner.address)
            expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150))

            const addr1Balance = await luaToken.balanceOf(addr1.address)
            expect(addr1Balance).to.equal(100)

            const addr2Balance = await luaToken.balanceOf(addr2.address)
            expect(addr2Balance).to.equal(50)
        })
    })

    describe("Approve", function () {
        beforeEach(async function () {
            await luaToken.connect(owner).transfer(addr1.address, 1000)
            await luaToken.connect(addr1).approve(owner.address, 200)
        })
        it("`addr1` should allow `owner` spend 200LUA", async function () {
            await luaToken
                .connect(owner)
                .transferFrom(addr1.address, addr2.address, 200)

            const balance = await luaToken.balanceOf(addr1.address)
            expect(balance).to.be.equal(800)
        })
        it("`addr1` must not allow `owner` spend more than 200LUA", async function () {
            await expect(
                luaToken
                    .connect(owner)
                    .transferFrom(addr1.address, addr2.address, 200 + 1)
            ).to.be.revertedWith("ERC20: insufficient allowance")

            await expect(
                luaToken
                    .connect(owner)
                    .transferFrom(addr1.address, addr2.address, 300)
            ).to.be.revertedWith("ERC20: insufficient allowance")
        })
    })
    describe("Allowency", function () {
        beforeEach(async function () {
            await luaToken.connect(owner).transfer(addr1.address, 1000)
            await luaToken.connect(addr1).approve(owner.address, 200)
        })
        it("`owner` can spend 200LUA of `addr1`", async function () {
            const initAllowBalance = await luaToken
                .connect(addr1)
                .allowance(addr1.address, owner.address)
            expect(initAllowBalance).to.be.equal(200)
        })
        it("`owner` can not spend any LUA of `addr1`", async function () {
            await luaToken.connect(addr1).approve(owner.address, 0)

            await expect(
                luaToken
                    .connect(owner)
                    .transferFrom(addr1.address, addr2.address, 200)
            ).to.be.revertedWith("ERC20: insufficient allowance")
        })
    })
})

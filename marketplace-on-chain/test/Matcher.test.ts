import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Matcher__factory, Matcher } from "../typechain-types"
import { Duck__factory, Duck } from "../typechain-types"
import { Lua__factory, Lua } from "../typechain-types"
import hardhat, { ethers } from "hardhat"
import { expect } from "chai"

describe("Matcher", () => {
    /**
     * @DeclareWallet
     * - Owner
     * - Others
     */
    let owner: SignerWithAddress
    let seller: SignerWithAddress
    let bidder: SignerWithAddress
    let addrs: SignerWithAddress[]

    /**
     * @DeclareSmartContracts
     * - ERC20
     * - ERC721
     * - Matcher
     */
    let Lua: Lua
    let Duck: Duck
    let Matcher: Matcher

    describe("Wallet", async () => {
        it("Create Wallets", async () => {
            ;[owner, seller, bidder, ...addrs] = await ethers.getSigners()
        })
    })

    describe("Deploy", async () => {
        it("Deploy ERC20", async () => {
            const luaFactory = await hardhat.ethers.getContractFactory("Lua")
            Lua = await luaFactory.deploy(1000)
        })
        it("Deploy ERC721", async () => {
            const DuckFactory = await hardhat.ethers.getContractFactory("Duck")
            Duck = await DuckFactory.deploy()
        })
        it("Deploy Matcher", async () => {
            const MatcherFactory = await hardhat.ethers.getContractFactory(
                "Matcher"
            )
            Matcher = await MatcherFactory.deploy()
        })
    })
    describe("Mint", async () => {
        it("Mint Duck NFT", async () => {
            await Duck.connect(owner).mintTo(owner.address)
        })
    })
    describe("Transfer", async () => {
        it("Owner Transfer 1 Duck NFT to Seller", async () => {
            await Duck.connect(owner).transferFrom(
                owner.address,
                seller.address,
                0
            )
        })
        it("Owner Transfer Lua ERC20 Bidder", async () => {
            await Lua.connect(owner).transfer(bidder.address, 100)
        })
        it("Bidder must have 100 Lua", async () => {
            const bidderBalance = await Lua.connect(owner).balanceOf(
                bidder.address
            )
            expect(bidderBalance).to.equal(100)
        })
        it("Seller must have 1 Duck NFT", async () => {
            const sellerBalance = await Duck.connect(owner).balanceOf(
                seller.address
            )
            expect(sellerBalance).to.equal(1)
        })
    })
    describe("Approve", async () => {
        it("Seller Approve Matcher", async () => {
            await Duck.connect(seller).approve(Matcher.address, 0)
        })
        it("Bidder Approve Matcher", async () => {
            await Lua.connect(bidder).approve(Matcher.address, 50)
        })
    })
    describe("Swap", async () => {
        it("Swap Auction", async () => {
            /**
             * @SwapOnMatcher
             * - Seller ->   NFT   -> Bidder
             * - Seller <-  ERC20  <- Bidder
             */
            const NFTid = 0
            const sellerStruct = {
                ERC721Contract: Duck.address,
                message: ethers.utils.hashMessage(NFTid.toString()),
                signature: await seller.signMessage(NFTid.toString()),
                addr: seller.address,
                NFTid: NFTid
            }

            const bid = 30
            const bidderStruct = {
                ERC20Contract: Lua.address,
                message: ethers.utils.hashMessage(bid.toString()),
                signature: await bidder.signMessage(bid.toString()),
                addr: bidder.address,
                bid: bid
            }

            await Matcher.swap(sellerStruct, bidderStruct, {
                gasLimit: 500000
            })
        })
    })

    describe("Validate Swap", async () => {
        it("Seller must have 30 Lua", async () => {
            const swapSeller = await Lua.connect(owner).balanceOf(
                seller.address
            )
            expect(swapSeller).to.equal(30)
        })
        it("Bidder must have 1 Duck NFT", async () => {
            const swapBidder = await Duck.connect(owner).balanceOf(
                bidder.address
            )

            expect(swapBidder).to.equal(1)
        })
    })
})

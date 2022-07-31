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
     * @DeclareContracts
     * - ERC20
     * - ERC721
     * - Matcher
     */
    let Lua: Lua
    let Duck: Duck
    let Matcher: Matcher

    beforeEach(async () => {
        /**
         * @CreateWallets
         * - Owner
         * - Others
         */
        ;[owner, seller, bidder, ...addrs] = await ethers.getSigners()
        console.log("🔑 Created Wallets")

        /**
         * @Deploy
         * - ERC20
         * - ERC721
         * - Matcher
         */
        const DuckFactory = await hardhat.ethers.getContractFactory("Duck")
        const luaFactory = await hardhat.ethers.getContractFactory("Lua")
        const MatcherFactory = await hardhat.ethers.getContractFactory(
            "Matcher"
        )

        Matcher = await MatcherFactory.deploy()
        Lua = await luaFactory.deploy(1000)
        Duck = await DuckFactory.deploy()

        console.log("🚀 Deployed SmartContract")

        /**
         * @Mint
         * - NFT
         * - Token
         */
        await Duck.connect(owner).mintTo(seller.address)
        await Lua.connect(owner).transfer(bidder.address, 100)

        console.log("✅ Minted Tokens")

        /**
         * @ApproveToMatcher
         * - Seller
         * - Bidder
         */
        await Duck.connect(seller).approve(Matcher.address, 0)
        await Lua.connect(bidder).approve(Matcher.address, 50)

        console.log("🤝 Matcher Approved")
    })
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

        /**
         * @ValidateSwap
         * - seller must have 30 Lua
         * - bidder must have Duck NFT
         */

        const swapBidder = await Duck.connect(owner).balanceOf(bidder.address)
        const swapSeller = await Lua.connect(owner).balanceOf(seller.address)

        expect(swapBidder).to.equal(1)
        expect(swapSeller).to.equal(30)

        console.log("🔁 Swaped NFT <-> ERC20")
    })
})

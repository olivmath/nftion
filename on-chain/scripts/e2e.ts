import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Matcher__factory, Matcher } from "../typechain-types"
import { Duck__factory, Duck } from "../typechain-types"
import { Lua__factory, Lua } from "../typechain-types"
import hardhat, { ethers } from "hardhat"

async function E2E() {
    /**
     * @CreateWallets
     * - Owner
     * - Others
     */
    let owner: SignerWithAddress
    let seller: SignerWithAddress
    let bidder: SignerWithAddress
    let addrs: SignerWithAddress[]
    ;[owner, seller, bidder, ...addrs] = await ethers.getSigners()

    /**
     * @Deploy
     * - ERC20
     * - ERC721
     * - Matcher
     */
    const MatcherFactory = await hardhat.ethers.getContractFactory("Matcher")
    const Matcher = await MatcherFactory.deploy()

    const DuckFactory = await hardhat.ethers.getContractFactory("Duck")
    const Duck = await DuckFactory.deploy()

    const luaFactory = await hardhat.ethers.getContractFactory("Lua")
    const Lua = await luaFactory.deploy(1000)

    /**
     * @Mint
     * - NFT
     * - Token
     */
    await Duck.connect(owner).mintTo(seller.address)
    await Lua.connect(owner).transfer(bidder.address, 100)

    /**
     * @ApproveToMatcher
     * - Seller
     * - Bidder
     */
    await Duck.connect(seller).approve(Matcher.address, 0)
    await Lua.connect(bidder).approve(Matcher.address, 50)

    /**
     * @SwapOnMatcher
     * - Seller ->   NFT   -> Bidder
     * - Seller <-  ERC20  <- Bidder
     */
    const sellerStruct = {
        ERC721Contract: Duck.address,
        message: ethers.utils.hashMessage("0"),
        signature: await seller.signMessage("0"),
        addr: seller.address,
        NFTid: 0
    }

    const bidderStruct = {
        ERC20Contract: Lua.address,
        message: ethers.utils.hashMessage("30"),
        signature: await bidder.signMessage("30"),
        addr: bidder.address,
        bid: 30
    }

    await Matcher.swap(sellerStruct, bidderStruct, {
        gasLimit: 500000
    })

    /**
     * @ValidateSwap
     * - seller must have 30 Lua
     * - bidder must have Duck NFT
     */

    const x = await Duck.connect(owner).balanceOf(bidder.address)
    const y = await Lua.connect(owner).balanceOf(seller.address)

    console.log(`Bidder: ${x}`)
    console.log(`Seller: ${y}`)
}

E2E().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

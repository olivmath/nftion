import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Matcher__factory, Matcher } from "../typechain-types"
import { ethers as hardhat } from "hardhat"

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
})
//     describe("Signatures", () => {
//         it("Passing Structs", async () => {
//             const seller = {
//                 ERC721Contract: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
//                 message: ethers.utils.hashMessage("1"),
//                 signature: await owner.signMessage("1"),
//                 addr: owner.address,
//                 NFTid: 1
//             }

//             const bidder = {
//                 ERC20Contract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//                 message: ethers.utils.hashMessage("99"),
//                 signature: await owner.signMessage("99"),
//                 addr: owner.address,
//                 bid: 99
//             }

//             expect(true).to.equal(
//                 await matcher.connect(addr1).swap(seller, bidder, {gasLimit: 50000})
//             )
//         })
//     })
// })

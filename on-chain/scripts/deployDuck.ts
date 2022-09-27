import hardhat from "hardhat"

async function deployDuck() {
    console.log("🕐 Deploying ERC-721: Duck NFT")
    const owner = (await hardhat.ethers.getSigners())[0]
    console.log(owner.toJSON())

    const contractFactory = await hardhat.ethers.getContractFactory("Duck")
    const deployedContract = await contractFactory.deploy()

    console.log(`✅ Contract Deployed Address: ${deployedContract.address}`)
    console.log(`🔑 Contract Owner: ${owner.address}`)
}

deployDuck().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

import hardhat from "hardhat"

async function deployLua() {
    console.log("🕐 Deploying ERC-20: LUA Token")
    const owner = (await hardhat.ethers.getSigners())[0]

    const contractFactory = await hardhat.ethers.getContractFactory("Lua")
    const deployedContract = await contractFactory.deploy(1000)

    console.log(`✅ Contract Deployed Address: ${deployedContract.address}`)
    console.log(`🔑 Contract Owner: ${owner.address}`)
}

deployLua().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

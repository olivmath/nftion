import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Lua__factory, Lua } from "../typechain-types";

async function transfer() {
    let luaToken: Lua;
	let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress
    let addrs: SignerWithAddress[];
	[
		owner,
		addr1,
		addr2,
		...addrs
	] = await ethers.getSigners();

    const luaTokenFactory = (
      	await ethers.getContractFactory(
        	"Lua", owner
      	)
    ) as Lua__factory;

    const totalSupply = ethers.utils.parseEther((100).toString())
    luaToken = await luaTokenFactory.deploy(totalSupply)

	// `owner` send 100LUA to `addr1`
	await luaToken.connect(owner).transfer(addr1.address, 100)

    // allow `owner` send 200LUA of `addr1`
	await luaToken.connect(addr1).approve(owner.address, 200)

	// `owner` send 100LUA of `addr1` to `addr2`
	await luaToken.connect(owner).transferFrom(addr1.address, addr2.address, 100)

    // `owner` send 200LUA to `addr1`
    await luaToken.connect(owner).transfer(addr1.address, 200)

    // `owner` send 100LUA of `addr1` to `addr2`
    await luaToken.connect(owner).transferFrom(addr1.address, addr2.address, 100)

    const balance = await luaToken.balanceOf(addr1.address);
    console.log(balance)
};


transfer().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
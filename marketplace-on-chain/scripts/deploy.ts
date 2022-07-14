// import { ethers } from "hardhat";

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = ethers.utils.parseEther("1");

//   const Lock = await ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log("Lock with 1 ETH deployed to:", lock.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const hre = require("hardhat");

async function deploy() {
  console.log("🕐 Deploying smart-contract...")
  const [owner, addr1] = await hre.ethers.getSigners();
  const initBalance = await owner.getBalance();

  const contractFactory = await hre.ethers.getContractFactory("Lua");
  const deployedContract = await contractFactory.deploy(100);

  const endBalance = await owner.getBalance();
  console.log(`✅ Contract Deployed Address: ${deployedContract.address}`)
  console.log(`🔑 Contract Owner: ${owner.address}`)
  console.log(`💸 Deploy spend: ${(initBalance - endBalance) / 1e18} ethers`)
};


deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
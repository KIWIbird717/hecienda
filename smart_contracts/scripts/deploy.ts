import { ethers, upgrades } from "hardhat";
import hre from "hardhat"

function delay(ms: number) {
  console.log("Pause for: ", ms / 1000);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

  const StablecoinFactory = await ethers.getContractFactory("Hacienda")
  const Stablecoin = await upgrades.deployProxy(StablecoinFactory, [], {
    initializer: 'initialize',
    kind: "uups"

  });
  await Stablecoin.deployed();

  console.log(Stablecoin.address)

  await delay(20000);

  await hre.run("verify:verify", {
    address: Stablecoin.address,
    constructorArguments: [
    ],

  });  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

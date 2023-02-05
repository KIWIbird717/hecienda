import { ethers, upgrades } from "hardhat";

async function main() {

  const StablecoinFactory = await ethers.getContractFactory("Stablecoin")
  const Stablecoin = await upgrades.deployProxy(StablecoinFactory, [], {
    initializer: 'initialize',
    kind: "uups"

  });
  await Stablecoin.deployed();

  console.log(Stablecoin.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

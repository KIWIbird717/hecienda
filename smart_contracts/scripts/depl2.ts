import { ethers, upgrades } from "hardhat";
import hre from "hardhat";
const switcher = 10000;
function delay(ms: number) {
    console.log("Pause for: ", ms / 1000);
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function main() {


  
  

  const contractFactory = await ethers.getContractFactory("LinearVestingVault")
  const contract = await contractFactory.deploy(
  );
  await contract.deployed();


  console.log(contract.address, "ChunkedVestingVault")



  if (switcher >1){
        await delay(20000);

  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: [
    ],

  });
  }
  
  

  
  const vestfactoryFactory = await ethers.getContractFactory("LinearVestingVaultFactory")
  const vestfactory = await vestfactoryFactory.deploy(
    contract.address
  );
  await vestfactory.deployed();

  console.log(vestfactory.address, "factory")

  
  if (switcher >1){
      
  await delay(20000);

  await hre.run("verify:verify", {
    address: vestfactory.address,
    constructorArguments: [
      contract.address    
    ],

  });  
  }


  
//   const tokenApprove = await VoidersToken.approve(vestfactory.address, 100000000000000);
//   await tokenApprove.wait();

//   // 10000
//   const summ = 10000

//   const createVault = await vestfactory.createVault(VoidersToken.address, "0x53B824334c4462aAd8cf7B31fa2c873F5f438f89", await tsssss.start(), await tsssss.end(), 100000000000000) 
// const contractReceipt = await createVault.wait()
// // VaultCreated(token, beneficiary, address(clone)
// const event = contractReceipt.events?.find(event => event.event === 'VaultCreated')
// const infoVaultCreated = event?.args!['vault']
// console.log(infoVaultCreated, "vesting final address")
//9,12,15,18,21,24. (Первый unlock -10%, остальные по 18%).
  // const itnit = await contract.initialize("0x53B824334c4462aAd8cf7B31fa2c873F5f438f89");
  // await itnit.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
import { ethers, upgrades } from "hardhat";
import hre from "hardhat";
const switcher = 10;
function delay(ms: number) {
    console.log("Pause for: ", ms / 1000);
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function main() {

    // MyToken
    const tssssssFactory = await ethers.getContractFactory("ts")
    const tsssss = await tssssssFactory.deploy(
    );
    await tsssss.deployed();
    console.log(tsssss.address, "ts")


    const VoidersTokenFactory = await ethers.getContractFactory("Hacienda")
    const VoidersToken = await upgrades.deployProxy(VoidersTokenFactory, [], {
      initializer: 'initialize',
      kind: "uups"
    });

    await VoidersToken.deployed();
    console.log(VoidersToken.address, "VoidersToken")

      if (switcher >1){
        await delay(20000);

        await hre.run("verify:verify", {
          address: VoidersToken.address,
          constructorArguments: [
          ],
      
        });
      }

  
  
  

  const contractFactory = await ethers.getContractFactory("LinearVestingVault")
  const contract = await contractFactory.deploy(
  );
  await contract.deployed();


  console.log(contract.address, "LinearVestingVault")



  if (switcher >1){
        await delay(5000);




  try {
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address:  contract.address,
      constructorArguments: [],
    });
  } catch (err: any) {
    if (err.message.includes("Reason: Already Verified")) {
      console.log("Contract is already verified!");
    }
  }
  }
  
  

  
  const vestfactoryFactory = await ethers.getContractFactory("LinearVestingVaultFactory")
  const vestfactory = await vestfactoryFactory.deploy(
    contract.address
  );
  await vestfactory.deployed();

  console.log(vestfactory.address, "LinearVestingVaultFactory")

  
  if (switcher >1){
      
  await delay(5000);


  try {
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address:  vestfactory.address,
      constructorArguments: [],
    });
  } catch (err: any) {
    if (err.message.includes("Reason: Already Verified")) {
      console.log("Contract is already verified!");
    }
  }

  }


  
  const tokenApprove = await VoidersToken.approve(vestfactory.address, 10000);
  await tokenApprove.wait();

  
  const createVault = await vestfactory.createVault(VoidersToken.address, "0x53B824334c4462aAd8cf7B31fa2c873F5f438f89", await tsssss.start(), await tsssss.end(), 10000) 
const contractReceipt = await createVault.wait()
// VaultCreated(token, beneficiary, address(clone)
const event = contractReceipt.events?.find(event => event.event === 'VaultCreated')
const infoVaultCreated = event?.args!['vault']
console.log(infoVaultCreated, "vesting final address")
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
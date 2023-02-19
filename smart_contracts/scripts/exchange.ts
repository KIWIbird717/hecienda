import { ethers } from "hardhat";
import hre from "hardhat";
const switcher = 123;
function delay(ms: number) {
    console.log("Pause for: ", ms / 1000);
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function main() {
    // address _address, uint _cost, address _tokenAddress, address _vesting, uint _startTimestamp, uint _endTimestamp, uint _max, uint _min
    // MyToken
    const contractFactory = await ethers.getContractFactory("exchange")
    const contract = await contractFactory.deploy(
        "0xa6Acf3140FD82957F8d8e81fFAD8f6f78Ca13E89", 1000, "0xFF84a7fbbBA12D039418592768FCa6Ae9FE90DcB",
        "0x360663D506032507dfB85963bfD2A461C07C12B8",1000000000000000,  10000000
    );
    await contract.deployed();
    console.log(contract.address, "contract")


  

      if (switcher >1){
        await delay(20000);

        await hre.run("verify:verify", {
          address: contract.address,
          constructorArguments: [
            "0xa6Acf3140FD82957F8d8e81fFAD8f6f78Ca13E89", 1000, "0xFF84a7fbbBA12D039418592768FCa6Ae9FE90DcB",
            "0x360663D506032507dfB85963bfD2A461C07C12B8", 1000000000000000,  10000000
          ],
      
        });
      }

  
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
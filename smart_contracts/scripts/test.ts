import { ethers } from "hardhat";
// require('dotenv').config();

import arts from '../artifacts/contracts/ticketExchange.sol/exchange.json';
async function mvt_approve() {
//   const provider = ethers.getDefaultProvider(
//     process.env.PROVIDER
//   );
  const [signer] = await ethers.getSigners();

  const contract = new ethers.Contract(
    "0xEbeFf027798084A967d8C1B11c12470c3E675661",
    arts.abi,
    signer
  );

  const summ = 10000000


  const itnit = await contract.buyTickets(summ)
  await itnit.wait();

}

mvt_approve()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
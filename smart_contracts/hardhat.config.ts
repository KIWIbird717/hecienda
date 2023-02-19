import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    goerli: {
      url: process.env.PROVIDER,
      accounts: [process.env.PRIVATE_KEY!],
    },
    matic: {
      // allowUnlimitedContractSize: true,
			url: "https://polygon-mumbai.g.alchemy.com/v2/QMkUZUk7wDJRIVsBWFBQnEyvDE2yW7Np",
			accounts:
				process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org/",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    // mainnet: {
    //   url: process.env.PROVIDER,
    //   accounts: [process.env.PRIVATE_KEY!],
    // },
  },
  etherscan: {
    apiKey: "AFEMDPHAWXPHKI8SQJK9AS77UIAZN9NGCN",

    // polygonMumbai: "AFEMDPHAWXPHKI8SQJK9AS77UIAZN9NGCN" ,

  },
};

export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;

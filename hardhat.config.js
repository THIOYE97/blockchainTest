require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const { INFURA_ENDPOINT, MNEMONIC } = process.env;

const INFURA_API_KEY = "48a84d52f69549348cdc9b3d11c2feca"
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.11",
  paths: { artifacts: "./src/artifacts" },

  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: INFURA_ENDPOINT,
      chainId:11155111,
      accounts: ["ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
    },
  },
};


ma proposition ici :
Tu supprimes en haut

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });


const INFURA_HTTP_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: INFURA_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

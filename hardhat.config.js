require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    atlantis: {
      url: "https://atlantis-web3.blockxnet.com",
      accounts: ['08ffd5f306ee937434f63962046d7316a868e224cecb5b88dd2b100aabecceef'],
      network_id: 19077,
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000, 
    }
  }
};

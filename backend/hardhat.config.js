/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-waffle');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: './.env' });

const privatekey = process.env.PRIVATE_KEY;
 
module.exports = {
  solidity: "0.8.0",
  networks: {
    polygonTestnet: {
      url: `https://rpc-mumbai.matic.today/`,
      accounts: [`0x${privatekey}`],
      network_id: 80001,
    },
  }
};
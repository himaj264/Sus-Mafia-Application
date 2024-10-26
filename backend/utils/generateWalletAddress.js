const ethers = require('ethers');  
const crypto = require('crypto');
// const { web3 } = require("../config/blockchain");

const generateWalletAddress = async () => {
  let id = crypto.randomBytes(32).toString('hex');
  let privateKey = "0x"+id;
  // const wallet = await web3.eth.personal.newAccount();

  // await web3.eth.personal.unlockAccount(wallet);

  // return wallet;
  let wallet = new ethers.Wallet(privateKey);
  let walletAddress =  wallet.address;
  return walletAddress;
};

module.exports = generateWalletAddress;
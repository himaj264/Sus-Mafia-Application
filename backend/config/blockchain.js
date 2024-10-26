const { ethers } = require("ethers");
const SusMafia = require('../artifacts/contracts/SusMafiaDao.sol/SusMafia.json');

const { susMafiaDaoAddress } = require('./constants');

// Polygon Testnet
const web3 = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today/');

let susMafia, susMafiaInterface;

const initializeBlockchain = async () => {
  try {
    // Contract Object
    susMafia = new ethers.Contract(susMafiaDaoAddress, SusMafia.abi, web3);
    susMafiaInterface = new ethers.utils.Interface(SusMafia.abi);
  }
  catch (err) {
    console.log(err);
  }
};

const getMethods = async () => {
  return { 
    susMafia,
    susMafiaInterface,
    susMafiaDaoAddress
  };
};

module.exports = {
  initializeBlockchain,
  web3,
  getMethods,
};
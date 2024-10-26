const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account Balance: ${balance.toString()}`);

  const DeOffer = await ethers.getContractFactory('SusMafia');
  const deOffer = await DeOffer.deploy();
  console.log(`Contract address: ${deOffer.address}`)

  if(deOffer.address) {
    const content = 
    `const susMafiaDaoAddress = "${deOffer.address}";\n\nmodule.exports = {\n  susMafiaDaoAddress\n}`;

    fs.writeFileSync('config/constants.js', content);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
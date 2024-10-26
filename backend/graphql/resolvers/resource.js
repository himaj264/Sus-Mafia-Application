const { ethers } = require("ethers");
const dotenv = require('dotenv');
const abi = require("ethereumjs-abi");
const { toBuffer } = require("ethereumjs-util");

// load env vars
dotenv.config({ path: './.env' });

const Resource = require("../../models/resourceModel");
const User = require("../../models/userModel");
const { getMethods, web3 } = require("../../config/blockchain");

const getSignatureParameters = signature => {
  if (!ethers.utils.isHexString(signature)) {
    throw new Error(
        'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = ethers.BigNumber.from(v).toNumber();
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v
  };
};

const constructMetaTransactionMessage = (nonce, salt, functionSignature, contractAddress) => {
  return abi.soliditySHA3(
    ["uint256","address","uint256","bytes"],
    [nonce, contractAddress, salt, toBuffer(functionSignature)]
  );
};

const writeHelper = async (deLibC, wallet, functionSignature, deLibInterface, gasLimit, deLibContractAddress) => {
  // let nonce = await deLibC.getNonce(wallet.address);
  
  // let messageToSign = constructMetaTransactionMessage(0, 80001, functionSignature, deLibContractAddress);
  
  const signature = await wallet.signMessage(functionSignature);
  console.info(`User signature is ${signature}`);

  let { r, s, v } = getSignatureParameters(signature);

  let rawTx, tx;
  rawTx = {
    to: deLibContractAddress,
    data: deLibInterface.encodeFunctionData("mint", [wallet.address, 100]),
    from: wallet.address,
    gasLimit: gasLimit,
  };
  console.log(rawTx);

  tx = await wallet.signTransaction(rawTx);
  console.log(tx);

  let transactionHash;
  try {
    let receipt = await web3.sendTransaction(tx);
    console.log(receipt);
  } 
  catch (error) {
    if (error.returnedHash && error.expectedHash) {
      console.log("Transaction hash : ", error.returnedHash);
      transactionHash = error.returnedHash;
    } 
    else {
      console.log(error);
      console.log("Error while sending transaction");
    }
  }

  if (transactionHash) {
    // display transactionHash
    let receipt = await window.web3.waitForTransaction(transactionHash);
    console.log(receipt);
    //show Success Message
  } 
  else {
    console.log("Could not get transaction hash");
  }
}

// Create a new resource
exports.createResource = async (args, { req }) => {
  try {
    const resourceExists = await Resource.findOne({ name: args.resourceInput.name });

    if (resourceExists) {
      throw new Error('Resource already exists');
    }

    const { susMafia, susMafiaInterface, susMafiaDaoAddress } = await getMethods();
    const user = await User.findById(args.resourceInput.userId);
    // On blockchain
    let functionSignature = susMafiaInterface.encodeFunctionData("mint", [user.walletAddress, 100]);

    const gasLimit = 500000;

    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

    await writeHelper(susMafia, wallet, functionSignature, susMafiaInterface, gasLimit, susMafiaDaoAddress);

    const resource = await Resource.create({
      name: args.resourceInput.name,
      email: args.resourceInput.email,
      bio: args.resourceInput.bio
    });

    if (resource) {
      return {
        ...resource._doc,
      };
    } else {
      throw new Error('Invalid resource data');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get resource profile
exports.getResourceProfile = async (args, { req }) => {
  try {
    const resou = await Resource.findById(args.resourceId);

    if (resou) {
      return {
        ...resou._doc,
      };
    } else {
      throw new Error('Resource not found');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get all resources
exports.getResources = async (args, { req }) => {
  try {
      const resources = await Resource.find({});
      return resources;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Delete resource
exports.deleteResource = async (args, { req }) => {
  try {
      const resource = await Resource.findById(args.resourceId);

      if (resource) {
        await resource.remove();
        return { msg: 'Resource removed' };
      } else {
        throw new Error('Resource not found');
      }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get resource by ID
exports.getResourceById = async (args, { req }) => {
  try {
      const resource = await Resource.findById(args.resourceId);

      if (resource) {
        return resource;
      } else {
        throw new Error('Resource not found');
      }
    
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update Resource
exports.updateResource = async (args, { req }) => {
  try {
      const resource = await Resource.findById(args.resourceId);

      if (resource) {
        resource.name = args.resourceInput.name || resource.name;
        resource.email = args.resourceInput.email || resource.email;
        resource.bio = args.resourceInput.bio || resource.bio;
        resource.url = args.resourceInput.url || resource.url;

        const updatedresource = await resource.save();

        return {
          ...updatedresource._doc,
        };
      } else {
        throw new Error('Resource not found');
      }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// getBalance
exports.getBalance = async (args, { req }) => {
  try {
    const { susMafia } = await getMethods();
    
    const balance = await susMafia.balanceOf(args.walletAddress);
    return { msg: JSON.stringify(ethers.utils.formatUnits(balance, 10)*10**10) };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
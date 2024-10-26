const cron = require('node-cron');
const Resource = require('../models/resourceModel');
const axios = require('axios');

const scrapeData = async () => {
  const resources = Resource.find();

  resources.forEach(async (reso) => {
    if(reso.url && reso.url.trim() !== "") {
      const data = await axios.get(`http://ee9c-106-51-243-64.ngrok.io/scrape?url=${url}`);
      Resource.findByIdAndUpdate(reso._id, { $set: data.data });
    }
  })
};

const startChecking = () => {
  console.log("Started Checking");
  cron.schedule('0 0 0 1 * *', () => {
    scrapeData();
  });

  // cron.schedule('*/1 * * * *', () => {
  //   scrapeData();
  // });
};

module.exports = startChecking;

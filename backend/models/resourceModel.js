const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
		type: String,
	},
  email: {
		type: String,
	},
  url: {
    type: String,
  },
  bio: {
    type: String,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Resource', resourceSchema);

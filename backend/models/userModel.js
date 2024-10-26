const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
  walletAddress: {
    type: String, // Wallet Address (Hash)
    required: true,
  }, 
	email: {
		type: String,
	},
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
  },
},
{
  timestamps: true,
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT token and return when a user logs in (this is a method and not static, we did this to keep our controller methods clean)
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
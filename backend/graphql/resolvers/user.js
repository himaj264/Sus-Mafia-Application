const User = require("../../models/userModel");
const generateWalletAddress = require("../../utils/generateWalletAddress");

const generateToken = (user) => {
	const token = user.getSignedJwtToken();
	return token
};

// Register a new user
exports.registerUser = async (args, { req }) => {
  try {
    const userExists = await User.findOne({ email: args.userInput.email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const walletAddress = await generateWalletAddress();

    const user = await User.create({
      name: args.userInput.name,
      email: args.userInput.email,
      password: args.userInput.password,
      walletAddress: walletAddress
    });

    if (user) {
      return {
        ...user._doc,
        token: generateToken(user),
      };
    } else {
      throw new Error('Invalid user data');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// User login
exports.login = async (args, { req }) => {
  const user = await User.findOne({ email: args.email });

  if (user && (await user.matchPassword(args.password))) {
    return {
      ...user._doc,
      token: generateToken(user),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

// Get user profile
exports.getUserProfile = async (args, { req }) => {
  try {
      const user = await User.findById(args.userId);

      if (user) {
        return {
          ...user._doc,
        };
      } else {
        throw new Error('User not found');
      }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get all users
exports.getUsers = async (args, { req }) => {
  try {
      const users = await User.find({}).select('-password');
      return users;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Delete user
exports.deleteUser = async (args, { req }) => {
  try {
      const user = await User.findById(args.userId);

      if (user) {
        await user.remove();
        return { msg: 'User removed' };
      } else {
        throw new Error('User not found');
      }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get user by ID
exports.getUserById = async (args, { req }) => {
  try {
      const user = await User.findById(args.userId).select('-password');

      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update user
exports.updateUser = async (args, { req }) => {
  try {
      const user = await User.findById(args.userId);

      if (user) {
        user.name = args.userInput.name || user.name;
        user.email = args.userInput.email || user.email;
        user.bio = args.userInput.bio || user.bio;

        const updatedUser = await user.save();

        return {
          ...updatedUser._doc,
          password: null,
        };
      } else {
        throw new Error('User not found');
      }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
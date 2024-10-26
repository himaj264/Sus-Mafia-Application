const {
  login,
  registerUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('./user.js');

const {
  createResource,
  getResources,
  getResourceProfile,
  deleteResource,
  getResourceById,
  updateResource,
  getBalance
} = require('./resource.js');

const {
  getChats,
} = require('./chat.js');

module.exports = {
  // users
  login: login,
  registerUser: registerUser,
  getUserProfile: getUserProfile,
  getUsers: getUsers,
  deleteUser: deleteUser,
  getUserById: getUserById,
  updateUser: updateUser,
  //  resources
  createResource: createResource,
  getResources: getResources,
  getResourceProfile: getResourceProfile,
  deleteResource: deleteResource,
  getResourceById: getResourceById,
  updatedresource: updateResource,
  getBalance: getBalance,
  // chats
  getChats: getChats,
};

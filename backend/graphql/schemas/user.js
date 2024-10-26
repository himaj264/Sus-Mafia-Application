const UserSchema = `
type User {
    _id: ID
    name: String
    email: String
    password: String
    isAdmin: Boolean
    bio: String
    token: String
    walletAddress: String
}

input UserInput {
    name: String
    email: String
    password: String
    isAdmin: Boolean
}

input UpdateUserInput {
    name: String
    email: String
    bio: String
    password: String
    isAdmin: Boolean
}

type Response {
    msg: String
}
`;

module.exports = {UserSchema}
const { buildSchema } = require('graphql');
const { UserSchema } = require('./user.js');
const { ResourceSchema } = require('./resource.js');
const { ChatSchema } = require('./chat.js');

module.exports = buildSchema(`
    ${UserSchema}

    ${ResourceSchema}

    ${ChatSchema}

    type rootQuery {
        login(email: String!, password: String!): User!
        getUserProfile(userId: ID!): User!
        getUsers: [User!]!
        getUserById(userId: ID!): User!

        getResourceProfile(resourceId: ID!): Resource!
        getResources: [Resource!]!
        getResourceById(resourceId: ID!): Resource!
        getBalance(walletAddress: String): Response!

        getChats: [Chat!]!
    }
    type rootMutation {
        registerUser(userInput: UserInput!): User!
        updateUser(userId: ID!, userInput: UpdateUserInput!): User!
        deleteUser(userId: ID!): Response!

        createResource(resourceInput: ResourceInput!): Resource!
        updateResource(resourceId: ID!, resourceInput: UpdateResourceInput!): Resource!
        deleteResource(resourceId: ID!): Response!
    }
    schema {
        query: rootQuery
        mutation: rootMutation
    }
`);

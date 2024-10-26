const ResourceSchema = `
type Resource {
    _id: ID
    name: String
    email: String
    url: String
    bio: String
}

input ResourceInput {
    name: String
    email: String
    url: String
    bio: String
    userId: ID
}

input UpdateResourceInput {
    name: String
    email: String
    url: String
    bio: String
}
`;

module.exports = {ResourceSchema}
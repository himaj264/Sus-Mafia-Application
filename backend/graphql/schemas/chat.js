const ChatSchema = `
type Chat {
    _id: ID
    chatMessage: String
    sender: User
    type: String
    roomId: ID
}
`;

module.exports = {ChatSchema}
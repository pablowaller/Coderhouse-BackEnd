class MessageDTO {

    constructor(messageData) {
        this.id = messageData._id;
        this.message = messageData.message;
        this.author = messageData.user;
        this.timestamp = messageData.timestamp;
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.message;
    }

    getAuthor() {
        return this.author;
    }

    getTimestamp() {
        return this.timestamp
    }
}

module.exports = MessageDTO;
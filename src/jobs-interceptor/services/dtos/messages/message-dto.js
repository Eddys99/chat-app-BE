class MessageDTO {
    constructor(data) {
        console.log({ data });
        this.request_id = `${data.sender_id}_${Date.now()}`;
        this.conversation_id = data.conversation_id;
        this.sender_id = data.sender_id;
        this.text = data.text;
    }
}

module.exports = MessageDTO;

const MessagesRepository = require('../repositories/messages-repository');

const MessageDTO = require('./dtos/messages/message-dto');

const $LABEL = 'MessagesService';

class MessagesService {

    static saveMessage(raw_payload) {
        const $JOB_LABEL = 'saveMessage', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new MessageDTO(raw_payload);

        return MessagesRepository.save(payload);
    }

    static getMessages(payload) {
        const $JOB_LABEL = 'getMessages', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const query = { conversation_id: payload.conversation_id };

        return MessagesRepository.getMessages(query);
    }
}

module.exports = MessagesService;

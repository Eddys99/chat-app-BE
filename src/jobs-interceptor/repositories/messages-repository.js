const MessageModel = require('src/commons/external-services/mongo-db/models/message-schema');

const $LABEL = 'MessagesRepository';

class MessagesRepository {

    static save(data) {
        const $JOB_LABEL = 'save', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newMessage = new MessageModel(data);

            return newMessage.save()
                .then(response => {
                    console.log(`${$LOG_LABEL} message saved`);
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to save message: `, { error });
                    return reject(error);
                });
        });
    }

    static getMessages(query) {
        const $JOB_LABEL = 'getMessages', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return MessageModel.find(query, null, null)
                .then(messages => {
                    return resolve(messages)
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get messages: `, { error });
                    return reject(error);
                })
        });
    }
}

module.exports = MessagesRepository;

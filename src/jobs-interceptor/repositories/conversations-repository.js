const ConversationModel = require('src/commons/external-services/mongo-db/models/conversation-schema');

const $LABEL = 'ConversationsRepository';

class ConversationsRepository {

    static saveFriend(data) {
        const $JOB_LABEL = 'saveFriend', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newFriend = new ConversationModel(data);

            return newFriend.save()
                .then(response => resolve(response))
                .catch(error => {
                    console.log(`${$LOG_LABEL} failed to save new friend in list: `, { error });
                    return reject(error);
                })
        });
    }

    static getFriends(query) {
        const $JOB_LABEL = 'getFriends', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return ConversationModel.findOne(query, null, null)
                .then(conversation => {
                    return resolve(conversation)
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get conversation: `, { error });
                    return reject(error);
                })
        });
    }
}

module.exports = ConversationsRepository;

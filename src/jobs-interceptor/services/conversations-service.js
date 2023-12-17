const DataTypeCheck = require('src/commons/utils/check-if');

const ConversationsRepository = require('../repositories/conversations-repository');
const UserRepository = require('../repositories/user-repository');

const NewConversationDTO = require('./dtos/conversations/new-conversation-dto');

const $LABEL = 'ConversationsService';

class ConversationsService {

    static async saveFriend(data) {
        const $JOB_LABEL = 'saveFriend', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const query = { username: data.added_friend };
        const user_data = await UserRepository.getUser(query);
        const participants_ids = [data.my_user_id, user_data._id.toString()];
        const payload = new NewConversationDTO(data, participants_ids);

        return new Promise((resolve, reject) => {
            return ConversationsRepository.saveFriend(payload)
                .then(response => resolve(response))
                .catch(error => reject(error));
        })
    }

    static getFriends(participants) {
        const $JOB_LABEL = 'getFriends', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const query = { participants };
        console.log(query);

        return new Promise((resolve, reject) => {
            return ConversationsRepository.getFriends(query)
                .then(conversation => {
                    if (!DataTypeCheck.itIsObjectWithKeys(conversation)) {
                        return ConversationsService.saveFriend(participants);
                    } else {
                        return resolve(conversation);
                    }
                })
                .catch(error => reject(error));
        });
    }
}

module.exports = ConversationsService;

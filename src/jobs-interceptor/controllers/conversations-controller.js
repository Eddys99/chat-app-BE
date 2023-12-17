const ConversationsService = require('../services/conversations-service');

const AddFriendDTO = require('../dtos/conversations/add-friend-dto');

const $LABEL = 'ConversationsController';

class ConversationsController {

    static addFriend(request, response) {
        const $JOB_LABEL = 'getFriends', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new AddFriendDTO(request.body);

        return ConversationsService.saveFriend(payload)
            .then(messages => response.status(200).json({ success: true, messages }))
            .catch(error => response.status(400).json({ success: false, error }));

    }

    static getFriends(request, response) {
        const $JOB_LABEL = 'getFriends', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = request.body;

        return ConversationsService.getFriends(payload)
            .then(messages => response.status(200).json({ success: true, messages }))
            .catch(error => response.status(400).json({ success: false, error }));
    }
}

module.exports = ConversationsController;

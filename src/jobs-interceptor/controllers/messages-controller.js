const MessagesService = require('../services/messages-service');

const GetMessageDTO = require('../dtos/messages/get-messages-dto');

const $LABEL = 'MessagesController';

class MessagesController {

    static getMessages(request, response) {
        const $JOB_LABEL = 'getMessages', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new GetMessageDTO(request.body);

        return MessagesService.getMessages(payload)
            .then(messages => response.status(200).json({ success: true, messages }))
            .catch(error => response.status(400).json({ success: false, error }));
    }
}

module.exports = MessagesController;

const { Server } = require('socket.io');

const MessagesService = require('../services/messages-service');
const ConversationsService = require('../services/conversations-service');

const $LABEL = 'SocketServer';

class SocketServer {
    constructor(PORT) {
        try {
            console.log(`[${$LABEL}] listening on PORT: ${PORT}`);
            const io = new Server(null, {
                cors: {
                    origin: 'http://localhost:5173'
                }
            });

            io.on('connection', (socket) => {
                console.log(`[${$LABEL}] connected`);

                socket.on('disconnected', () => {
                    console.log(`[${$LABEL}] subscriber disconnected`);
                });

                socket.on('private-message', (data) => {
                    try {
                        MessagesService.saveMessage(data);
                    } catch (error) {
                       console.error(`[SocketServer] failed to save message: `, { error });
                    }
                });

                socket.on('save-friend', (data) => {
                    try {
                        ConversationsService.saveFriend(data);
                    } catch(error) {
                        console.error(`[SocketServer] failed to save friend: `, { error });
                    }
                });
            });

            io.listen(PORT);
        } catch(error) {
            console.log(`Failed to init socket-server... `, { error });
            return error;
        }
    }
}

module.exports = SocketServer;

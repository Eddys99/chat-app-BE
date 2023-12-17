'use strict'

const UserController = require('../controllers/user-controller');
const MessagesController = require('../controllers/messages-controller');
const ConversationsController = require('../controllers/conversations-controller');

class Router {
    constructor(express) {
        const userRouter = express.Router();
        const messagesRouter = express.Router();
        const conversationsRouter = express.Router();
        const app = express();

        // User-action endpoints
        userRouter.route('/register')
            .post(
                UserController.register
            );

        userRouter.route('/login')
            .post(
                UserController.login
            );

        app.use('/user', userRouter);

        // Messages endpoints
        messagesRouter.route('/get-messages')
            .post(
                MessagesController.getMessages
            );

        app.use('/messages', messagesRouter);

        // Conversations endpoints
        conversationsRouter.route('/get-friends')
            .post(
                ConversationsController.getFriends
            );

        conversationsRouter.route('/add-friend')
            .post(
                ConversationsController.addFriend
            );

        app.use('/conversations', conversationsRouter);

        return app;
    }
}

module.exports = Router;

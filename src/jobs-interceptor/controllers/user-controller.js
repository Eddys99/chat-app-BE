const UserService = require('../services/user-service');

const UserRegisterDTO = require('../dtos/user/user-register-dto');
const UserLoginDTO = require('../dtos/user/user-login-dto');

const $LABEL = 'UserController';

class UserController {

    static register(request, response) {
        const $JOB_LABEL = 'register', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserRegisterDTO(request.body);

        return UserService.register(payload)
            .then(_response => {
                return response.status(200).json({ success: true });
            })
            .catch(error => {
                return response.status(400).json({ error, success: false });
            });
    }

    static login(request, response) {
        const $JOB_LABEL = 'login', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserLoginDTO(request.body);

        return UserService.login(payload)
            .then(user => {
                return response.status(200).json({ user, success: true });
            })
            .catch(error => {
                return response.status(400).json({ error, success: false });
            });
    }
}

module.exports = UserController;

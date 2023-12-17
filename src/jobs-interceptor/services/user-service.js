const Bcrypt = require('bcrypt');

const CheckIf = require('src/commons/utils/check-if');

const UserRepository = require('../repositories/user-repository');
const LoginUserObjectDTO = require('./dtos/user/login-user-object');

const $LABEL = 'UserService';

class UserService {

    static register(payload) {
        const $JOB_LABEL = 'register', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise(async (resolve, reject) => {
            const username_query = { username: payload.username };
            const email_query = { email: payload.email };

            const getByUsername = await UserRepository.getUser(username_query);
            const checkIfUsernameIsTaken = (CheckIf.itIsObjectWithKeys(getByUsername));

            const getByEmail = await UserRepository.getUser(email_query);
            const checkIfEmailIsTaken = (CheckIf.itIsObjectWithKeys(getByEmail));

            if (!checkIfUsernameIsTaken && !checkIfEmailIsTaken) {
                return UserService.encryptPassword(payload.password)
                    .then(encryptedPassword => {
                        payload.password = encryptedPassword;

                        return UserRepository.register(payload)
                            .then(response => resolve(response))
                            .catch(error => reject({ error, msg: 'Failed to store user in DB' }));
                    })
                    .catch(error => {
                        console.error(`${$LOG_LABEL} failed to encrypt user password: `, { error });
                        return reject({ error, msg: 'Failed to encrypt password' });
                    })

            } else {
                const usedFieldForRegistration = (checkIfUsernameIsTaken && !checkIfEmailIsTaken)
                    ? 'Username is taken'
                    : (!checkIfUsernameIsTaken && checkIfEmailIsTaken)
                        ? 'Email is taken'
                        : 'Username and Email are taken';

                return reject({ msg: usedFieldForRegistration });
            }
        });
    }

    static login(payload) {
        const $JOB_LABEL = 'login', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const query = { username: payload.username };

            return UserRepository.getUser(query)
                .then(document => {
                    return UserService.compareEncryptedPassword(payload.password, document.password)
                        .then(response => {
                            if (response === true) {
                                return resolve(new LoginUserObjectDTO(document));
                            } else {
                                return reject({ msg: 'Wrong password' });
                            }
                        })
                        .catch(error => {
                            console.error(`${$LOG_LABEL} failed to compare hashed password: `, { error });
                            return reject({ error, msg: 'Failed to compare hashed password' });
                        });
                })
                .catch(error => reject({ error, msg: 'This username is not registered' }));
        });
    }

    static async encryptPassword(password) {
        return await Bcrypt.hash(password, 10);
    }

    static async compareEncryptedPassword(password, hash) {
        return await Bcrypt.compare(password, hash);
    }
}

module.exports = UserService;

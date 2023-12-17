const UserModel = require('src/commons/external-services/mongo-db/models/user-schema');

const $LABEL = 'UserRepository';

class UserRepository {

    static register(data) {
        const $JOB_LABEL = 'register', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newUser = new UserModel(data);

            return newUser.save()
                .then(response => {
                    console.log(`${$LOG_LABEL} user registered`);
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to register user: `, { error });
                    return reject(error);
                });
        });
    }

    static getUser(query) {
        const $JOB_LABEL = 'getUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
           return UserModel.findOne(query, null, null)
               .then(document => {
                   return resolve(document);
               })
               .catch(error => {
                   console.error(`${$LOG_LABEL} failed to get user: `, { error });
                   return reject(error);
               });
        });
    }
}

module.exports = UserRepository;

class LoginUserObject {
    constructor(data) {
        this.user_id = data._id.toString();
        this.username = data.username;
        this.email = data.email;
    }
}

module.exports = LoginUserObject;

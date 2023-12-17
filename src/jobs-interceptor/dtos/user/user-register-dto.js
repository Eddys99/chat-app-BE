class UserRegisterDTO {
    constructor(data) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
}

module.exports = UserRegisterDTO;

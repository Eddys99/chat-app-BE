class AddFriendDTO {
    constructor(data) {
        this.added_friend = data.username;
        this.my_email = data.my_data.email;
        this.my_user_id = data.my_data.user_id;
        this.my_username = data.my_data.username;
    }
}

module.exports = AddFriendDTO;

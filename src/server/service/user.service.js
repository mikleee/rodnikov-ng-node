const ModelService = require("./model.service");
const {User} = require("../db/user.model");


class UserService extends ModelService {

    constructor() {
        super(User);
    }

    findByUserName(userName) {
        return User.findOne({userName: userName});
    }

    async isPasswordValid(userName, password) {
        let user = await this.findByUserName(userName);
        return password === user.password;
    }

    async resolveUser(userName, password) {
        let user = await this.findByUserName(userName);
        if (!user) {
            throw new Error('auth.username.invalid');
        }
        if (password !== user.password) {
            throw new Error('auth.password.invalid');
        }

        return user;
    }

}


module.exports = new UserService();
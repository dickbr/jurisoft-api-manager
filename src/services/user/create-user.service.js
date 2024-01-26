const User = require('../../models/user.model');
const UserAlreadyExistsException = require('../../exceptions/user-already-exists.exeception')

class CreateUserService {
  async execute({ email, password, role }) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    const user = new User({
      email,
      password,
      role
    });

    await user.save();
  }
}

module.exports = CreateUserService;
const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserNotFoundException = require('../../exceptions/user-not-found.exeception')
const UnauthorizedException = require('../../exceptions/unauthorized.exeception')

class AuthUserService {
  async execute({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    const accessToken = jwt.sign({ email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email: user.email, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}

module.exports = AuthUserService;
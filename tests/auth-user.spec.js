const AuthUserService = require('../src/services/user/auth-user.service')
const User = require('../src/models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserNotFoundException = require('../src/exceptions/user-not-found.exeception');
const UnauthorizedException = require('../src/exceptions/unauthorized.exeception');

describe('AuthUserService', () => {
  let service, password
  const input = {
    email: 'some-email',
    password: 'some-pass',
  }

  beforeEach(async () => {
    service = new AuthUserService()
    User.findOne = jest.fn();
    jwt.sign = jest.fn()
    jest.spyOn(bcrypt, 'hash').mockImplementation((password, saltRounds) => Promise.resolve('hashedPassword'));
    password = await bcrypt.hash(input.password, 100);
  })

  it.each([
    {
      should: 'autenticar usuário com sucesso',
      input,
      setup: () => {
        User.findOne.mockResolvedValueOnce({
          email: input.email,
          password
        })
        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
        jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options) => 'some-token');
      },
      expected: (result) => {
        expect(result).toEqual({
          accessToken: 'some-token',
          refreshToken: 'some-token'
        })
      }
    },
    {
      should: 'retornar UnauthorizedException',
      input,
      setup: () => {
        User.findOne.mockResolvedValueOnce({
          email: input.email,
          password
        })
        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
      },
      expected: (result) => {
        expect(result).toBeInstanceOf(UnauthorizedException)
      }
    },
    {
      should: 'retornar UserNotFoundException',
      input,
      setup: () => {
        User.findOne.mockResolvedValueOnce(undefined)
      },
      expected: (result) => {
        expect(result).toBeInstanceOf(UserNotFoundException)
      }
    }
  ])('Deve $should', async ({ input, setup, expected }) => {
    if (setup) setup();
    await service.execute(input).then(expected).catch(expected);
  }, 10000)
});

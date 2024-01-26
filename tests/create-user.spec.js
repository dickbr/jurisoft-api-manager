const CreateUserService = require('../src/services/user/create-user.service')
const User = require('../src/models/user.model');
const UserAlreadyExistsException = require('../src/exceptions/user-already-exists.exeception');

describe('CreateUserService', () => {
  let service

  beforeEach(() => {
    service = new CreateUserService()
    User.findOne = jest.fn();
    User.save = jest.fn();
    User.prototype.save = jest.fn();
  })

  const input = {
    email: 'some-email',
    password: 'some-pass',
    role: 'user'
  }

  it.each([
    {
      should: 'criar usuário com sucesso',
      input,
      setup: () => {
        jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined)
        User.prototype.save.mockResolvedValueOnce(undefined);
      },
      expected: (result) => {
        expect(User.prototype.save).toBeCalledTimes(1)
      }
    },
    {
      should: 'retornar UserAlreadyExistsException',
      input,
      setup: () => {
        User.findOne.mockResolvedValueOnce({ id: 'some-id' })
      },
      expected: (result) => {
        expect(result).toBeInstanceOf(UserAlreadyExistsException)
      }
    }
  ])('Deve $should', async ({ input, setup, expected }) => {
    if (setup) setup();
    await service.execute(input).then(expected).catch(expected);
  }, 10000)
});

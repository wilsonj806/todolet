import { responseMock, requestMock } from "./mocks/mockReqRes";

import { deleteUser } from '../middleware/userDeleteMiddelware'

import User from '../../models/user'


const user = {
  _id: [1, 2, 3 ,4],
  username: 'guest'
};

const sessionData = {
  passport: {
    user: [1,2,3,4]
  }
}
describe('A middleware function for deleting a user', () => {
  let res;
  const next = jest.fn()

  const req = requestMock(sessionData)
  req.user = {}
  req.user = {...user};
  beforeAll(() => {
    res = responseMock();
  });

  test('it should log the user out before deleting the user', async (done) => {

    await deleteUser(req, res, next)

    expect(req.logout).toHaveBeenCalled()
    done()
  })

  test('it should try deleting the user from the database', async (done) => {
    const spy = jest.spyOn(User, 'findByIdAndDelete');

    await deleteUser(req, res, next)

    expect(spy).toHaveBeenCalled()
    done()
  })

  test('it should send a success response if it succeeds', async (done) => {
    jest.spyOn(User, 'findByIdAndDelete')
      .mockImplementation((req): any => ({ username: 'test delete'}));

    await deleteUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg:expect.any(String)
      })
    )
    done();
  })

  test('it should send a failure response if the requested user to delete is invalid', async (done) => {
    jest.spyOn(User, 'findByIdAndDelete')
      .mockImplementation((req): any => {throw new Error('test fail')});

    await deleteUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg:expect.any(String)
      })
    );
    done()
  })

  test('it should send an error response if it fails', async (done) => {
    jest.spyOn(User, 'findByIdAndDelete').mockImplementation((req): any => { throw new Error('test error') });

    deleteUser(req, res, next)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg:expect.any(String)
      })
    );
    done()
  })

})


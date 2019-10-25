/**
 * Mock Express Request object
 * =============================================================
 *
 */
import { MockReq, MockRes } from "../../../types";

const requestMock = (sessionData: any = {}, body: any = {}, _validationErrors: any = []): any => ({
  session: {
    destroy: jest.fn(callback => callback()),
    ...sessionData},
  body,
  logout: jest.fn().mockImplementation(() => true)
});

/**
 * NOTE ALL STUBBED Express Response methods need to return res
 *  otherwise it breaks when you try to chain it
 */
const responseMock = (): any => {
  const res = {
    status: null,
    json: null,
    locals: {},
    mockJson: null,
    redirect: null
  };
  res.status = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockImplementation((obj) => {
    res.mockJson = obj;
    return res;
  });
  return res;
};

export { requestMock, responseMock }

/**
 * Mock Express Request object
 * =============================================================
 *
 */
import { MockReq, MockRes } from "../../types";

const requestMock = (sessionData: any, body: any, _validationErrors: any = []): any => ({
  session: sessionData,
  body,
});

const responseMock = (): any => {
  let res = {
    status: null,
    json: null,
    locals: {}
  };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export { requestMock, responseMock }

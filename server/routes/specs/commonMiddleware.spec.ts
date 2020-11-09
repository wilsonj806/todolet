/**
 * ANCHOR Unit Tests for common middleware
 * =============================================================
 * - Test suites for:
 *   - checkFormErrors()
 *
 * TODO
 * =============================================================
 *
 */
// import User from '../../models/user';

// import { checkForErrors } from '../routes/middleware/commonMiddleware';
import { requestMock, responseMock } from "./mocks/mockReqRes";
import {
  checkFormErrors,
  storeInResLocals,
} from "../middleware/commonMiddleware";

/**
 * ANCHOR Unit tests
 * =============================================================
 *
 */
describe("A middleware function to check the form for errors", () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;

  beforeAll(() => {
    res = responseMock();
  });

  it("should send a response with a list of form errors if it failed", () => {
    const req = requestMock(
      {},
      {
        username: "guest",
        password: undefined,
        password2: undefined,
        potato: "potato",
      }
    );
    req._validationErrors = [{ location: "username" }];

    checkFormErrors(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  it("should go to the next middleware function if there are no issues", () => {
    const req = requestMock(
      {},
      {
        username: "guest",
        password: undefined,
        password2: undefined,
        potato: "potato",
      }
    );
    req._validationErrors = [];

    checkFormErrors(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should send a response starting with "Error":', () => {
    const req = requestMock(
      {},
      {
        username: "guest",
        password: undefined,
        password2: undefined,
        potato: "potato",
      }
    );
    req._validationErrors = [{ location: "username" }];

    // jest.spyOn(User, 'find');

    checkFormErrors(req, res, next);

    const regexTest = regex.test(res.mockJson.msg);
    expect(regexTest).toBe(true);
  });
});

describe("A function for inserting entries into res.locals", () => {
  let res;
  beforeAll(() => {
    res = responseMock();
  });

  it("inserts an entry with the desired name and value into response", () => {
    const name = "test";
    const val = 1;
    storeInResLocals(res, name, val);
    expect(res.locals).toHaveProperty(name, val);
  });
});

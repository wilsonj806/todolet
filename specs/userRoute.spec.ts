/**
 * ANCHOR Unit tests and Integration tests for the User Route
 * =======================================================================
 *
 */
import bCrypt from 'bcryptjs';
import { validationResult } from 'express-validator/check';

import requestMock from './mocks/requestMock';
import responseMock from './mocks/responseMock';

import User from '../models/user';
import {
  postNewUser,
  getOneUser,
  postLogin,
  postLoginFail,
  getLogout,
} from '../routes/middleware/userMiddleware';

/**
 * NOTE Both unit tests and integration tests will need to be included
 * - unit tests should make sure the function gives the same output everytime and makes whatever calls needed
 * - integration tests should verify that the database is being called and stuff like that
 *
 * NOTE `validationResult` and `bCrypt` need mocking
 *
 */

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

describe('postNewUser middleware function for registering users', () => {
  test('it should send a error response if there are form errors', () => {

  });
  test('it should check for form errors', () => {

  });
  test('it should check for form errors', () => {

  });
});
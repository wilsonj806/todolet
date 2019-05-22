/**
 * Mock Express Response object
 * =============================================================
 *
 */

/* eslint-disable no-undef */

export = (): object => {
  const res = {
    status: null,
    json: null,
    msg: null,
    error: null,
  };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.msg = jest.fn().mockReturnValue(res);
  res.error = jest.fn().mockReturnValue(res);
  return res;
};

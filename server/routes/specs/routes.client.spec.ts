import { requestMock } from './mocks/mockReqRes'

import { checkSessionAndUrl } from '../routes.client';

describe('A function that checks what route a client is trying to access', () => {
  it('returns 200 for logged in and trying to go to an authenticated route', () => {
    const req = requestMock();
    req.user = {
      username: 'guest'
    }
    req.url = '/account';
    const assert200 = checkSessionAndUrl(req);
    expect(assert200).toBe(200)
  })

  it('returns 200 for logged out and trying to go to an unauthenticated route', () => {
    const req = requestMock();
    req.user = {}
    req.url = '/register';
    const assert200 = checkSessionAndUrl(req);
    expect(assert200).toBe(200)
  })

  it('returns 300 for logged in and trying to access an unauthenticated route', () => {
    const req = requestMock();
    req.user = {
      username: 'guest'
    }
    req.url = '/register';
    const assert300 = checkSessionAndUrl(req);
    expect(assert300).toBe(300)
  })

  it('returns 300 for logged out and trying to access an authenticated route', () => {
    const req = requestMock();
    req.user = {
    }
    req.url = '/account';
    const assert300 = checkSessionAndUrl(req);
    expect(assert300).toBe(300)
  })

  it('returns 404 if there are no matching routes', () => {
    const req = requestMock();
    req.user = {
      username: 'guest'
    }
    req.url = '/spore';
    const assert404 = checkSessionAndUrl(req);
    expect(assert404).toBe(404)
  })
})
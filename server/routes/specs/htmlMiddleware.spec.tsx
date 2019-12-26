import { requestMock, responseMock } from './mocks/mockReqRes';

import {
  STATE_KEY,
  htmlTemplate,
  returnHtml,
  gatherState
} from '../middleware/htmlMiddleware';

import { PREFETCHED_TODOS_KEY } from '../middleware/todoMiddleware';


describe('A function that generates an HTML doc', () => {
  test('it renders with a default title', () => {
    const strAssert = htmlTemplate('', '');
    const regex = new RegExp('Todolet')
    expect(regex.test(strAssert)).toBe(true)
  })

  test('it renders with a custom title', () => {
    const strAssert = htmlTemplate('', '', {} as any, '404');
    const regex = new RegExp('404')
    expect(regex.test(strAssert)).toBe(true)
  })

  test('it renders the input DOM', () => {
    const testStr = '<h1>Hello World</h1>'
    const regex = new RegExp(testStr)
    const str = htmlTemplate(testStr, '');
    const assert = regex.test(str);
    expect(assert).toBe(true);
  })

  test('it renders the input CSS', () => {
    const dom = '<h1>Hello World</h1>'
    const testStr = '.css{display:flex;}'
    const regex = new RegExp(testStr)
    const str = htmlTemplate(dom, testStr);
    const assert = regex.test(str);
    expect(assert).toBe(true);
  })

})

describe('A middleware function for gathering values from res.locals for prefetching state', () => {
  let res;
  const next = jest.fn();
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest',
    todos: ['333','444']
  };

  beforeAll(() => {
    console.log('running setup');
    res = responseMock();
    res.locals = Object.assign({});
    console.log(res.locals);
  });

  afterAll(() => {
    console.log('running clean up')
    res.locals = Object.assign({});
  })
  test('it calls next if the required value isn\'t there', () => {
    const req = requestMock();

    gatherState(req, res, next);
    expect(next).toHaveBeenCalled()
  })

  test('it does not continue with the function if the required value isn\'t there', () => {
    const req = requestMock();

    gatherState(req, res, next);
    expect(res.locals).not.toHaveProperty(STATE_KEY)
  })

  test('it gathers state and adds it as a new res.locals value', () => {
    const req = requestMock();
    req.user = user;
    const res = responseMock();
    const arr = [1,2,3,4]
    res.locals[PREFETCHED_TODOS_KEY] = arr

    gatherState(req, res, next);
    expect(res.locals).toHaveProperty(STATE_KEY)
  })

  test('it calls the next function in the middleware chain', () => {
    const req = requestMock();
    req.user = user;
    const res = responseMock();
    res.locals[PREFETCHED_TODOS_KEY] = []

    gatherState(req, res, next);
    expect(next).toHaveBeenCalled()
  })
})
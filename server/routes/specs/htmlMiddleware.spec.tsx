import { requestMock, responseMock } from './mocks/mockReqRes';

import {
  htmlTemplate,
  returnHtml
} from '../middleware/htmlMiddleware';

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
import FormService from '../FormService'

describe('A service method for validating a form', () => {
  test('it should check each key value pair of the input object', () => {
    const spy = jest.spyOn(Array.prototype, 'filter')
    expect(spy).toBeCalledWith('input object here')
  })

  test('it should throw an error if there are any keys missing values', () => {
    expect(() => FormService.validateForm).toThrow()
  })

  test('it should throw an error with a message saying which keys are missing values', () => {
    const form = {
      username: '',
      password: '',
      email: '',
      password2: ''
    }
    const formKeys = Object.keys(form);

    // NOTE testing that the FormService error has all keys inside
    formKeys.forEach(key =>
      expect(() => FormService.validateForm).toThrow(key))
  })
})

export {}
import FormService from '../FormService'

describe('A service method for validating a form', () => {
  test('it should not throw if there are no missing keys', () => {
    const login = {
      username: 'guest',
      password: 'welcome'
    }
    expect(() => FormService.validateForm(login)).not.toThrow()
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
      expect(() => FormService.validateForm(form)).toThrow(key))
  })
})

export {}
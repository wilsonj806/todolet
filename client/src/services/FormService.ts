import { postUserReq } from "../../../types";

const validateForm = <T extends {[key:string] : any}>(obj: T) : Error | null => {
  const entries = Object.entries(obj);
  const filteredRes : Array<any> = entries.filter((entry : Array<string>) => obj[entry[0]] === '')

  const arrLength = filteredRes.length;


  if (arrLength === 1) {
    throw new Error(`Form is missing the following fields: ${filteredRes[0]}`)
  } else if (arrLength > 1) {
    let errString = 'Error: Form is missing the following fields: '
    filteredRes.forEach((str: Array<string>, i) => {
      if (i === arrLength - 1) {
        return errString = errString + str[0]
      }
      errString = errString + str[0]  + ', '
    })
    console.log('throwing error\n', errString);
    throw new Error(errString)
  } else {
    return null
  }
}

// NOTE tests for this is arguably overkill since it just tests that passwords match
const validatePasswordFields = (obj: postUserReq) : Error | null => {
  const { password, password2 } = obj;
  if (password !== password2) throw new Error('Passwords don\'t match')
  return null;
}

const FormService = {
  validateForm,
  validatePasswordFields
}

export default FormService
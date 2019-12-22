import React, { FunctionComponent } from 'react';

import LayoutWrapper from '../layouts/LayoutWrapper';
import RegisterLayout from '../layouts/Register/RegisterLayout';

const RegisterPage: FunctionComponent<any> = () => {
  return (
    <LayoutWrapper>
      <RegisterLayout/>
    </LayoutWrapper>
  )
}

export default RegisterPage;
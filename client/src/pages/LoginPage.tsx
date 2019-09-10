import React, { FunctionComponent } from 'react';

import LayoutWrapper from '../layouts/LayoutWrapper';
import LoginLayout from '../layouts/Login/LoginLayout';

const LoginPage: FunctionComponent<any> = (props) => {
  return (
    <LayoutWrapper>
      <LoginLayout/>
    </LayoutWrapper>
  )
}

export default LoginPage;
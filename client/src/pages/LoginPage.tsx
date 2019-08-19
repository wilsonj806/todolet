import React, { FunctionComponent } from 'react';

import LayoutWrapper from '../containers/LayoutWrapper';
import LoginLayout from '../layouts/Login/Login';

const LoginPage: FunctionComponent<any> = (props) => {
  return (
    <LayoutWrapper>
      <LoginLayout/>
    </LayoutWrapper>
  )
}

export default LoginPage;
import React, { FunctionComponent } from 'react';

import LayoutWrapper from '../layouts/LayoutWrapper';
import LogoutLayout from '../layouts/Logout/LogoutLayout';

const LogoutPage: FunctionComponent<any> = () => {
  return (
    <LayoutWrapper>
      <LogoutLayout/>
    </LayoutWrapper>
  )
}

export default LogoutPage;
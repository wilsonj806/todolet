import React, { FC } from 'react';

import LayoutWrapper from '../layouts/LayoutWrapper';
import NotFoundLayout from '../layouts/404/404Layout';

const NotFoundPage: FC = () => {
  return (
    <LayoutWrapper>
      <NotFoundLayout/>
    </LayoutWrapper>
  )
}

export default NotFoundPage;
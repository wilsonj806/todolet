import React, { FC } from 'react';

import LayoutWrapper from '../layouts/LayoutWrapper';
import MainLayout from '../layouts/MainLayout/MainLayout'

const MainPage : FC<any> = () => (
  <LayoutWrapper>
    <MainLayout/>
  </LayoutWrapper>
)

export default MainPage;
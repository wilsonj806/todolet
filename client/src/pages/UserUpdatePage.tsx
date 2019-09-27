import React, { FC } from 'react';

import LayoutWrapper from '../layouts/LayoutWrapper';
import UserUpdateLayout from '../layouts/User-Update/UserUpdateLayout'

const UserUpdatePage : FC<any> = () => (
  <LayoutWrapper>
    <UserUpdateLayout/>
  </LayoutWrapper>
)

export default UserUpdatePage;
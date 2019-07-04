import React from 'react'
import { storiesOf } from '@storybook/react';

import Nav from '../components/hybrid/Nav';

storiesOf('Layout/Navbar', module)
  .add('it has a login/ current user thing', () => {
    return (
      <div>
        <Nav/>
      </div>
    )
  })
  .add('it has projects and tags', () => {
    return (
      <div>
      </div>
    )
  })


import React from 'react'

import { storiesOf } from '@storybook/react';

import ExampleDrawer from './examples/ExampleDrawer';


storiesOf('MUI Examples/Example Drawer', module)
  .add('it renders', () => <ExampleDrawer/>)
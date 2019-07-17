import React from 'react'

import { storiesOf } from '@storybook/react';

import ExampleDrawer from './examples/ExampleDrawer';
import SimpleTabs from './examples/ExampleTabs';


storiesOf('Examples|Example Drawer', module)
  .add('it renders', () => <ExampleDrawer/>)

  storiesOf('Examples|ExampleTabs', module)
  .add('it renders', () => <SimpleTabs/>)
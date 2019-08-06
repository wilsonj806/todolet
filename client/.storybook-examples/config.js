import { configure } from '@storybook/react';

const req = require.context('../src/mui-example-stories', true, /\.stories\.(js|tsx)$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
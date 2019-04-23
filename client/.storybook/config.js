import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/app.stories.tsx');
  require('../src/stories/base.stories.tsx');
  require('../src/stories/presentational.stories.tsx');
  require('../src/stories/stateful.stories.tsx');
  require('../src/stories/app-specific.stories.tsx');
}

configure(loadStories, module);
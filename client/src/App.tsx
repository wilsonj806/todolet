import React, { memo } from 'react';

import Body from './components/Body';
import Main from './containers/Main';
import Nav from './containers/Nav/Nav';


const App = memo(props => {
  return (
    <Body>
      <Nav/>
      <Main></Main>
    </Body>
  );
})

export default App;
import React, { FunctionComponent } from 'react';
import { render } from '@testing-library/react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ReactElement } from 'react';

const TestContainer: FunctionComponent<any> = ({ children }) => (
  <div>{ children }</div>
)

const RouterTest: FunctionComponent<any> = ({ children, path }) => {

  return (
    <Router>
      <Route path="/" exact={ true } render={ (routeProps) => children }/>
      <Route path={ path } render={ (routeProps) => <TestContainer>{ path }</TestContainer> }/>
    </Router>
  )
}

const renderWithRouter = (ui: ReactElement, path: String) => {
  return {
    ... render(
      <RouterTest path={ path }>
        { ui }
      </RouterTest>
    )
  }
}

export default renderWithRouter;
import React, { FunctionComponent, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { ReactElement } from 'react';
import { renderRouterFixtureConfig, RouterTestProps } from '../types';

const TestContainer: FunctionComponent<any> = ({ children }) => (
  <div>{ children }</div>
)

const InitWrapper = (props : { startingPath: string, children: ReactNode}) => (
  <div>
    <p>{ props.startingPath }</p>
    { props.children }
  </div>
)

const RouterTest: FunctionComponent<RouterTestProps> = ({ children, startingPath = '/', targetPath, history }) => {
  return (
    <Router history={ history }>
      <Route path={ startingPath } exact={ true } render={ (routeProps) => (
        <InitWrapper startingPath={ startingPath }>
          { children }
        </InitWrapper>
        )}/>
      <Route path={ targetPath } render={ (routeProps) => <TestContainer>{ targetPath }</TestContainer> }/>
    </Router>
  )
}

const renderWithRouter = (ui: ReactElement, config: renderRouterFixtureConfig = { startingPath: '/', targetPath: '/' }) => {
  const { startingPath, targetPath } = config;
    // ----- Build history with initial location)
  const history = createBrowserHistory()
  history.push(startingPath ? startingPath : '/');

  return {
    history,
    ... render(
      <RouterTest startingPath={ startingPath ? startingPath : '/' } targetPath={ targetPath } history={ history }>
        { ui }
      </RouterTest>
    )
  }
}

test('', () => expect(true).toBe(true))
export default renderWithRouter;
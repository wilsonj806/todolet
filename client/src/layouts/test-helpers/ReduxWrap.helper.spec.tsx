import React, { FC } from 'react';
import { Provider } from 'react-redux';

const ReduxWrap: FC<any> = ({ children, store }) => <Provider store={store}>{children}</Provider>;


export default ReduxWrap;
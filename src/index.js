/* eslint-disable prettier/prettier */

import React from 'react';
import { YellowBox } from 'react-native';

import Routes from './routes';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
]);

const App = () => {
  return <Routes />;
};

export default App;

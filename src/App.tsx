import React from 'react';

import renderRoutes from './routes/renderRoutes';
import { routes } from './routes/routes';

import './App.scss';

const App = (): JSX.Element => {
  return <div className="App">{renderRoutes(routes)}</div>;
};

export default App;

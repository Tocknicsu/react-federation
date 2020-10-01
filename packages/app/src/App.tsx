import '@babel/polyfill';

import React, { Fragment, FunctionComponent } from 'react';
import { Global, css } from '@emotion/core';
import DynamicLoad from './DynamicLoad';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Global
        styles={css`
          body {
            padding: 0px;
            margin: 0px;
          }
        `}
      />
      <DynamicLoad
        system={{
          url: 'http://localhost:9001/remoteEntry.js',
          scope: 'ui',
          module: './Widget',
        }}
      />
    </Fragment>
  );
};

export default App;

import React, { Fragment, FunctionComponent } from 'react';
import { Global, css } from '@emotion/core';
import Widget from './Widget';

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
      <Widget />
    </Fragment>
  );
};

export default App;

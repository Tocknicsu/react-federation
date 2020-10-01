import React from 'react';
import { hot } from 'react-hot-loader/root';

export default hot(function Widget() {
  return (
    <div
      style={{
        borderRadius: '4px',
        padding: '2em',
        backgroundColor: 'red',
        color: 'white',
      }}
    >
      <h2>App Widget!!!</h2>
    </div>
  );
});

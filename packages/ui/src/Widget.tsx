import React, { FunctionComponent } from 'react';

const Widget: FunctionComponent = () => {
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
};

export default Widget;

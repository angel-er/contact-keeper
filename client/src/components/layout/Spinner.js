import React, {Fragment} from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      syle={{width: '200px', margin: 'auto', display: 'block'}}
      alt='loading...'
    />
  </Fragment>
);

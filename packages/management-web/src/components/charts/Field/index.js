import './index.less';

import React from 'react';

const Field = ({ label, value, ...rest }) => (
  <div className='field' {...rest}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default Field;

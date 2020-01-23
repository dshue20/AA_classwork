import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <span>
      <Link to="/">Index</Link>&nbsp;
      <Link to="/new">Create</Link>
    </span>
)
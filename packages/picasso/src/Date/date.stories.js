import React, { useState } from 'react';

import Date from './index';

export default {
  title: 'Date',
  component: Date
};

const handleChange = (event, setDate) => {
  setDate(event.target.value);
};

export const withDate = () => {
  const [date, setDate] = useState(new Date());
  return (
    <Date
      name="date"
      placeholder="Enter Date..."
      value={date}
      onChange={event => handleChange(event, setDate)}
    />
  );
};

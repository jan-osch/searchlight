import * as React from 'react';

import {Entry} from './interfaces';

const LineEntry = (props: { entry: Entry }) => (
  <li>
    <p>{props.entry.text}</p>
    <p>{props.entry.movie}</p>
    <p>{props.entry.year}</p>
    <p>{props.entry.startTime}</p>
    <p>{props.entry.endTime}</p>
  </li>
);

export default LineEntry;

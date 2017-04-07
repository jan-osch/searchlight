import * as React from 'react';

import {Entry} from './interfaces';

const LineEntry = (props: { entry: Entry }) => (
  <li className='Entry'>
    <p className='Text'>{props.entry.text}</p>
    <p className='Movie'><strong>{props.entry.movie}</strong> <span className='LeftSpan'>({props.entry.year})</span></p>
    <p className='Times'><span>{props.entry.startTime}</span> <span className='LeftSpan'>{props.entry.endTime}</span>
    </p>
  </li>
);

export default LineEntry;

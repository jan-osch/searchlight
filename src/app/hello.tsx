import * as React from 'react';

import ApiHelper from './api';
import InputField from './inputField';
import LineEntry from './lineEntry';
import {Entry} from './interfaces';

interface IHelloProps {
}

interface IHelloState {
  entries: Array<Entry>;
}


export class Hello extends React.Component<IHelloProps, IHelloState> {
  constructor(props: IHelloProps) {
    super(props);
    this.state = {
      entries: []
    };
  }

  render() {
    return (
      <div>
        <div className='Menu'>
          <div className='Left'>
            left
          </div>

          <InputField
            onSmallChange={this.fetchEntries}
            onFullRequest={this.fetchRest}
          />

          <div className='Right'>
            right
          </div>
        </div>
        <div>
          <ul>
            {
              this.state.entries.map((e, i) => <LineEntry entry={e} key={i}/>)
            }
          </ul>
        </div>
      </div>
    );
  }

  fetchEntries = async (query: string) => {
    const entries = await ApiHelper.prefetch(query);
    this.setState({entries});
  }

  fetchRest = async (query: string) => {
    const entries = await ApiHelper.getFullResult(query);
    this.setState({entries});
  }
}


import * as React from 'react';

import SearchBar from './searchBar';
import ApiHelper from './api';
import LineEntry from './lineEntry';
import {Entry} from './interfaces';
import LogoForMenu from './components';

interface IHelloProps {
}

interface IHelloState {
  entries: Array<Entry>;
}


export class Main extends React.Component<IHelloProps, IHelloState> {
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
          <LogoForMenu/>

          <SearchBar
            onSmallChange={this.fetchEntries}
            onFullRequest={this.fetchRest}
          />

          <div className='Right'>
            <a href='/about'>ABOUT</a>
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
    if (query.length < 1) {
      return this.setState({entries: []});
    }
    const entries = await ApiHelper.prefetch(query);
    this.setState({entries});
  }

  fetchRest = async (query: string) => {
    if (query.length < 1) {
      return this.setState({entries: []});
    }

    const entries = await ApiHelper.getFullResult(query);
    this.setState({entries});
  }
}


import * as React from 'react';
import {Link} from 'react-router';

import SearchBar from './searchBar';
import EntryStore from './entryStore';
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

    EntryStore.entriesStream.onValue(entries => {
      this.setState({entries});
    });
  }

  render() {
    return (
      <div>
        <div className='Menu'>
          <LogoForMenu/>

          <SearchBar/>

          <div className='Right'>
            <Link to='/about'>ABOUT</Link>
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
}


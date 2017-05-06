import * as React from 'react'
import {Link} from 'react-router-dom'

import SearchBar from './searchBar'
import EntryStore from '../entryStore'
import LineEntry from './lineEntry'
import {IEntry} from '../../../server/interfaces'
import LogoForMenu from './common'
import {ROUTES} from '../routes'

interface IMainState {
  entries: Array<IEntry>;
}

export class Main extends React.Component<{}, IMainState> {
  private dispose: () => any

  constructor(props: {}) {
    super(props)
    this.state = {
      entries: [],
    }
  }

  componentDidMount = () => {
    this.dispose = EntryStore.entriesStream.onValue(entries => this.setState({entries: entries as any}))
  }

  componentWillUnmount = () => {
    this.dispose()
  }

  render() {
    return (
      <div>
        <div className='Menu'>
          <LogoForMenu/>

          <SearchBar/>

          <div className='Right'>
            <Link to={ROUTES.ABOUT}>ABOUT</Link>
          </div>
        </div>

        <div>
          <ul>
            {this.state.entries.map((e, i) => <LineEntry entry={e} key={i}/>)}
          </ul>
        </div>
      </div>
    )
  }
}


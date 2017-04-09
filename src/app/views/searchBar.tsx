import * as React from 'react';

import EntryStore from '../entryStore';

interface ISearchBarState {
  value: string;
  showSubmit: boolean;
}

export default class SearchBar extends React.Component<{}, ISearchBarState> {

  private dispose: () => any;

  constructor(props: {}) {
    super(props);
    this.state = {
      value: '',
      showSubmit: false,
    };
  }

  componentDidMount = () => {
    this.dispose = EntryStore.submitEnabledStream.onValue(showSubmit => {
      this.setState(
        {showSubmit}
      );
    });
  }

  componentWillUnmount = () => {
    this.dispose();
  }

  handleChange = (event) => {
    const inputText = event.target.value;
    this.setState({value: inputText});
    EntryStore.smallChangeBus.push(inputText);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    EntryStore.submitBus.push(true);
  }

  render() {
    return (
      <div className='SearchBar'>
        <form onSubmit={this.handleSubmit}>

          <input type='text'
                 autoFocus={true}
                 value={this.state.value}
                 placeholder='Search for a movie line...'
                 onChange={this.handleChange}
          />

          { this.state.showSubmit
            ? <button type='submit'>
              <img src='resources/search_icon.png' width={18} height={18}/>
            </button>
            : ''
          }
        </form>
      </div>
    );
  }
}

import * as React from 'react';

interface IInputFieldProps {
  onSmallChange: (query: string) => any;
  onFullRequest: (query: string) => any;
}

interface IInputFieldState {
  value: string;
}

export default class SearchBar extends React.Component<IInputFieldProps, IInputFieldState> {
  constructor(props: IInputFieldProps) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    const inputText = event.target.value;
    this.setState({value: inputText});

    this.props.onSmallChange(inputText);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onFullRequest(this.state.value);
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
          <button type='submit'>
            <img src='resources/search_icon.png' width={18} height={18}/></button>
        </form>
      </div>
    );
  }
}

import * as React from 'react';

interface IInputFieldProps {
  onSmallChange: (query: string) => any;
  onFullRequest: (query: string) => any;
}

interface IInputFieldState {
  value: string;
}

export default class InputField extends React.Component<IInputFieldProps, IInputFieldState> {
  constructor(props: IInputFieldProps) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    const inputText = event.target.value;
    this.setState({value: inputText});

    if (inputText.length >= 1) {
      this.props.onSmallChange(inputText);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.value.length >= 1) {
      this.props.onFullRequest(this.state.value);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit}>
          <input type='text'
                 autoFocus={true}
                 value={this.state.value}
                 placeholder='Search...'
                 onChange={this.handleChange}
          />
          <button type='submit'><img src="resources/search_icon.png" width={20} height={20}/></button>
        </form>
      </div>
    );
  }
}

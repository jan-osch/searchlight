import * as React from "react";

interface IHelloProps {
}

interface IHelloState {
  response: string;
}

class ApiHelper {
  static async getName(name: string): Promise<string> {
    const response = await fetch(`api/${name}`, {
      method: 'GET',
    });

    return response.text();
  }
}

export class Hello extends React.Component<IHelloProps, IHelloState> {
  constructor(props: IHelloProps) {
    super(props);
    this.state = {
      response: ''
    };
  }

  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <InputField trigger={this.performStuff}/>
        <p>{this.state.response}</p>
      </div>
    );
  }

  performStuff = async (query: string) => {
    const response = await ApiHelper.getName(query);
    this.setState({response});
  }
}

interface IInputFieldProps {
  trigger: (query: string) => any
}

interface IInputFieldState {
  value: string
}

class InputField extends React.Component<IInputFieldProps, IInputFieldState> {
  constructor(props) {
    super(props);
    this.state = {
      value: 'name'
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.trigger(this.state.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

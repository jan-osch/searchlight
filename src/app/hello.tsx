import * as React from "react";

interface IHelloProps {
}
;

interface IHelloState {
}
;

export class Hello extends React.Component<IHelloProps, IHelloState> {
  render() {
    return (
      <p>Hello world! Witaj świecie</p>
    );
  }
}

import React, { Component } from 'react';
import { Result } from 'antd';

type State = {
  error: Nullable<Error>;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <Result status='error' title='Упс, случилась непредвиденная ошибка'/>;
    }

    return children;
  }
}

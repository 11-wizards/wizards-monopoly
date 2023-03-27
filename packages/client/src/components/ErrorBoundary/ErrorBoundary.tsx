import React, { Component } from 'react';
import { ErrorPage } from '../../pages/ErrorPage';

type State = {
  error: Error | null;
};

type Props = {
  children: React.ReactNode;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
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
      return <ErrorPage />;
    }

    return children;
  }
}

export { ErrorBoundary };

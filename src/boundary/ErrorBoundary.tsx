import React, { Component, ErrorInfo } from 'react';
import errorImg from '../assets/genericError.jpg';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '500',
            width: '100%',
            backgroundColor: 'red',
          }}
        >
          <img src={errorImg} alt="Error boundary" width="100%" height="100%" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

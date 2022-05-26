import React from 'react';
import NotFoundPage from '@src/pages/404';

export default class ErrorBoundary extends React.Component {
  state: any;

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <NotFoundPage />;
    }

    return this.props.children;
  }
}

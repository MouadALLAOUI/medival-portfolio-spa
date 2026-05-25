import React from 'react';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("Arcane anomaly caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom medieval-themed recovery layout
      return (
        <div className={styles.overlay}>
          <div className={styles.parchment}>
            <div className={styles.sealContainer} aria-hidden="true">
              <span className={styles.waxSeal}>🛡️</span>
            </div>
            <h1 className={styles.title}>📜 Arcane Anomaly Detected</h1>
            <p className={styles.description}>
              Fear not, traveler! A mystical disturbance has disrupted the balance of this realm.
              Our grand wizards have been summoned to restore the magical flow.
            </p>
            {this.state.error && (
              <pre className={styles.errorLog} aria-label="Anomaly error log">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              className={styles.resurrectBtn}
              type="button"
            >
              Attempt Resurrection
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from 'react';
import { SettingsContext } from '../../lib/contexts/settings.context';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends React.Component {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Arcane anomaly caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const t = this.context?.t || ((key) => key);
      return (
        <div className={styles.overlay}>
          <div className={styles.parchment}>
            <div className={styles.sealContainer} aria-hidden="true">
              <span className={styles.waxSeal}>🛡️</span>
            </div>
            <h1 className={styles.title}>{t('COMPONENTS.errorBoundary.title')}</h1>
            <p className={styles.description}>
              {t('COMPONENTS.errorBoundary.description')}
            </p>
            {this.state.error && (
              <pre className={styles.errorLog} aria-label={t('COMPONENTS.errorBoundary.errorLog')}>
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              className={styles.resurrectBtn}
              type="button"
            >
              {t('COMPONENTS.errorBoundary.retry')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

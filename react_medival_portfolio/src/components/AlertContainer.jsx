import { createPortal } from 'react-dom';
import { useAlerts } from '../lib/useAlerts';
import styles from './AlertContainer.module.scss';

const typeClassMap = {
  success: styles['alert-success'],
  error: styles['alert-error'],
  warning: styles['alert-warning'],
  info: styles['alert-info'],
  greeting: styles['alert-greeting'],
  chaos: styles['alert-chaos'],
  quest: styles['alert-greeting'],
  arcane: styles['alert-info'],
  divine: styles['alert-warning'],
  royal: styles['alert-warning'],
  cursed: styles['alert-chaos'],
};

export default function AlertContainer() {
  const { alerts, dismissAlert } = useAlerts();

  return createPortal(
    <div className={styles['alert-container']}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`${styles['alert-box']}
            ${typeClassMap[alert.type] || styles['alert-info']}
            ${alert.isLeaving ? 'animate-slide-down opacity-0' : ''}
          `}
          onClick={() => dismissAlert(alert.id)}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{alert.icon}</span>
            <p className="alert-message text-sm font-medium">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
}
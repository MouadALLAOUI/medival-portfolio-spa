import { useAlerts } from '../lib/useAlerts';

const typeClassMap = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
  greeting: 'alert-greeting',
  chaos: 'alert-chaos',
  quest: 'alert-greeting',
  arcane: 'alert-info',
  divine: 'alert-warning',
  royal: 'alert-warning',
  cursed: 'alert-chaos',
};

export default function AlertContainer() {
  const { alerts, dismissAlert } = useAlerts();

  return (
    <div className="alert-container w-full max-w-md px-4 pointer-events-none">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert-box pointer-events-auto cursor-pointer
            ${typeClassMap[alert.type] || 'alert-info'}
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
    </div>
  );
}
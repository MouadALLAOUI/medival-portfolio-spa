import { useAlerts } from '../lib/useAlerts';

export default function AlertContainer() {
  const { alerts, dismissAlert } = useAlerts();

  return (
    <div className="alert-container fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-md px-4 pointer-events-none">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert-box parchment-container p-4 rounded-lg shadow-lg border-2 animate-slide-up pointer-events-auto cursor-pointer
            ${alert.type === 'success' ? 'border-green-600 bg-green-50/90' : ''}
            ${alert.type === 'error' ? 'border-red-600 bg-red-50/90' : ''}
            ${alert.type === 'warning' ? 'border-yellow-600 bg-yellow-50/90' : ''}
            ${alert.type === 'info' ? 'border-blue-600 bg-blue-50/90' : ''}
            ${alert.type === 'quest' ? 'border-purple-600 bg-purple-50/90' : ''}
            ${alert.type === 'arcane' ? 'border-indigo-600 bg-indigo-50/90' : ''}
            ${alert.type === 'divine' ? 'border-amber-600 bg-amber-50/90' : ''}
            ${alert.type === 'royal' ? 'border-yellow-700 bg-yellow-100/90' : ''}
            ${alert.type === 'cursed' ? 'border-gray-700 bg-gray-800/90 text-white' : ''}
            ${alert.type === 'chaos' ? 'border-orange-600 bg-orange-50/90' : ''}
            ${alert.type === 'greeting' ? 'border-pink-600 bg-pink-50/90' : ''}
            ${!['success', 'error', 'warning', 'info', 'quest', 'arcane', 'divine', 'royal', 'cursed', 'chaos', 'greeting'].includes(alert.type) ? 'border-gray-400 bg-gray-50/90' : ''}
            ${alert.isLeaving ? 'animate-slide-down opacity-0' : ''}
          `}
          onClick={() => dismissAlert(alert.id)}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{alert.icon}</span>
            <p className="alert-message text-sm font-medium text-gray-800">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
const Alert = ({ type = 'info', children, onClose }) => {
  const styles = {
    success: 'bg-green-950/30 border-green-600 text-green-400',
    error: 'bg-red-950/30 border-red-600 text-red-400',
    warning: 'bg-yellow-950/30 border-yellow-600 text-yellow-400',
    info: 'bg-blue-950/30 border-blue-600 text-blue-400',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${styles[type]} relative`} role="alert">
      <div className="flex items-start">
        <span className="text-xl mr-3">{icons[type]}</span>
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-lg hover:opacity-70"
            aria-label="Fechar"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;

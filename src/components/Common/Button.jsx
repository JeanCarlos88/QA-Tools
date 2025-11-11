const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

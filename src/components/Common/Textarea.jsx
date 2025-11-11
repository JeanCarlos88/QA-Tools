const Textarea = ({ 
  label, 
  error, 
  helperText,
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="label">
          {label}
        </label>
      )}
      <textarea
        className={`input-field resize-y ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;

const Select = ({ 
  label, 
  options = [], 
  error, 
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
      <select
        className={`input-field ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={typeof option === 'object' ? option.value : option} 
            value={typeof option === 'object' ? option.value : option}
          >
            {typeof option === 'object' ? option.label : option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;

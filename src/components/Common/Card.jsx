const Card = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h2 className="text-xl font-bold text-gray-100">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

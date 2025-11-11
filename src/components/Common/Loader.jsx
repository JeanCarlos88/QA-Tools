const Loader = ({ size = 'medium', message = 'Carregando...' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizes[size]} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`}></div>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
};

export default Loader;

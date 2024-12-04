import classNames from 'classnames';

const StatusBadge = ({ status, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'px-3 py-1 rounded-full text-xs font-medium transition-colors',
        status === 'Active' 
          ? 'bg-green-50 text-green-600 hover:bg-green-100'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      )}
    >
      {status}
    </button>
  );
};

export default StatusBadge;
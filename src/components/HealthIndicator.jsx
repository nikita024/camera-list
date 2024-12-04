import { Cloud, Monitor } from 'lucide-react';

const getHealthColor = (grade) => {
  const colors = {
    'A': 'text-green-500',
    'B': 'text-blue-500',
    'C': 'text-yellow-500',
    'D': 'text-orange-500',
    'F': 'text-red-500'
  };
  return colors[grade] || 'text-gray-500';
};

const HealthIndicator = ({ cloud, device }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Cloud size={16} className={`h-5 w-5 ${getHealthColor(cloud)} mr-1`}  />
        <span className={`ml-1 text-sm font-medium ${getHealthColor(cloud)}`}>{cloud}</span>
      </div>
      <div className="flex items-center">
        <Monitor size={16} className={`h-5 w-5 ${getHealthColor(device)} mr-1`} />
        <span className={`text-sm font-medium ${getHealthColor(device)}`}>{device}</span>
      </div>
    </div>
  );
};

export default HealthIndicator;
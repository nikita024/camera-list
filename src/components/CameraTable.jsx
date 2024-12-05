import { useState } from 'react';
import StatusBadge from './StatusBadge';
import HealthIndicator from './HealthIndicator';
import { MoreVertical, Trash2 } from 'lucide-react';

const CameraTable = ({ cameras, onStatusChange, onDelete }) => { 

  const [dropdownOpen, setDropdownOpen] = useState(null); 

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id); 
  };

  const handleOutsideClick = () => {
    setDropdownOpen(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-12 px-4 py-3">
              <input type="checkbox" className="rounded border-gray-300" />
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Health
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Recorder
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tasks
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cameras.map((camera) => (
            <tr key={camera.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded border-gray-300" />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${camera.current_status === 'Online' ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{camera.name}</span>
                      {camera.hasWarning && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          !
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{camera.email || 'sherwinwilliams@wobot.ai'}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <HealthIndicator cloud={camera.health?.cloud} device={camera.health?.device} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {camera.location}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {camera.recorder || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {camera.tasks ? `${camera.tasks} Tasks` : 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadge 
                  status={camera.status} 
                  onClick={() => onStatusChange(camera.id, camera.status === 'Active' ? 'Inactive' : 'Active')}
                />
              </td>
              <td className="px-4 py-4 whitespace-nowrap relative">
                <button
                  onClick={() => toggleDropdown(camera.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                {dropdownOpen === camera.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={() => {
                        onDelete(camera.id);
                        setDropdownOpen(null);
                      }}
                      className="flex items-center gap-2 block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Trash2 size={16} color='red' />
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {dropdownOpen && <div onClick={handleOutsideClick} className="fixed inset-0 z-10" />} */}
    </div>
  );
};

export default CameraTable;
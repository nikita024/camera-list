import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FilterDropdown = ({ label, icon: Icon, options, value, onChange }) => {
  return (
    <div className="relative flex-shrink-0">
      <div className="inline-flex rounded-md border border-gray-300 bg-white shadow-sm">
        <div className="px-3 py-2 flex items-center text-gray-700">
          {Icon && <Icon className="h-5 w-5 mr-2 text-gray-400" />}
          {/* <span className="text-sm font-medium">{label}</span> */}
        </div>
        <div className="relative">
          <select
            className="appearance-none h-full bg-transparent pl-3 pr-8 py-2 text-sm border-l border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled hidden>
              {label === "Location" ? "Location" : "Status"}
            </option>
            <option value="clear">Clear All</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {label === "Location" ? `${option}` : `${option}`}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;

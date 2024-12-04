import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange }) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-white">
      <div className="flex items-center"></div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center mr-4">
          <select
            className="border border-gray-200 rounded-md text-sm mr-4 px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={itemsPerPage}
            onChange={(e) => onPageChange(1, parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-gray-700">
            {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
              currentPage * itemsPerPage,
              totalItems
            )} of ${totalItems}`}
          </span>
        </div>

        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
        >
          <ChevronsLeft size={16} />
          <span className="sr-only">First Page</span>
        </button>
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
        >
          <ChevronRight size={16} />
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
        >
          <ChevronsRight size={16} />
          <span className="sr-only">Last Page</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;

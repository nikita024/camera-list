import { useState, useEffect } from 'react';
import { fetchCameras } from './api/cameraApi';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import CameraTable from './components/CameraTable';
import Pagination from './components/Pagination';
import { MapPinIcon, SignalIcon } from '@heroicons/react/24/outline';
import './index.css';
import brandLogo from './assets/brandlogo.svg';


function App() {
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadCameras();
  }, []);

  const loadCameras = async () => {
    try {
      const data = await fetchCameras();
      setCameras(data);
      setFilteredCameras(data);
    } catch (error) {
      console.error('Failed to load cameras:', error);
    }
  };
  
  useEffect(() => {
    let result = cameras;
  
    if (searchQuery) {
      result = result.filter(camera =>
        camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camera.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    if (locationFilter && locationFilter !== "clear") {
      result = result.filter(camera => camera.location === locationFilter);
    } else if (locationFilter === "clear") {
      setLocationFilter("");
    }
  
    if (statusFilter && statusFilter !== "clear") {
      result = result.filter(camera => camera.status === statusFilter);
    } else if (statusFilter === "clear") {
      setStatusFilter("");
    }
  
    setFilteredCameras(result);
    setCurrentPage(1);
  }, [searchQuery, locationFilter, statusFilter, cameras]);
  

  const handleStatusChange = (id, newStatus) => {
    setCameras(cameras.map(camera =>
      camera.id === id ? { ...camera, status: newStatus } : camera
    ));
  };

  const handleDelete = (id) => {
    setCameras(cameras.filter(camera => camera.id !== id));
  };

  const locations = [...new Set(cameras.map(camera => camera.location))];
  const statuses = ['Active', 'Inactive'];

  const paginatedCameras = filteredCameras.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCameras.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="flex justify-center align-middle items-center mb-8">
          <img src={brandLogo} alt="Logo" />
        </div>
      <div className="flex justify-between align-middle items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Cameras</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your cameras here.</p>
        </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <FilterDropdown
            label="Location"
            icon={MapPinIcon}
            options={locations}
            value={locationFilter}
            onChange={setLocationFilter}
          />
          <FilterDropdown
            label="Status"
            icon={SignalIcon}
            options={statuses}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <CameraTable
            cameras={paginatedCameras}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCameras.length}
            onPageChange={(page, items) => {
              setCurrentPage(page);
              if (items) setItemsPerPage(items);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
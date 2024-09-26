import React, { useState, useEffect } from 'react';

const contractsMockData = [
  { id: 1, name: 'Contract A', expirationDate: '2024-10-01', status: 'Pending Approval', priceChange: 5, isHighValue: true, details: 'Details about Contract A' },
  { id: 2, name: 'Contract B', expirationDate: '2024-09-25', status: 'In Progress', priceChange: -10, isHighValue: false, details: 'Details about Contract B' },
  { id: 3, name: 'Contract C', expirationDate: '2024-10-20', status: 'Renewed', priceChange: 15, isHighValue: false, details: 'Details about Contract C' },
  // Add more mock data if needed
];

const RenewalsExpirations = () => {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('expirationDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage] = useState(5);
  const [deletingContract, setDeletingContract] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    // Simulate fetching contracts from an API
    setContracts(contractsMockData);
  }, []);

  const handleSort = (field) => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(newDirection);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleBulkRenewal = () => {
    // Handle bulk renewal action
    console.log('Bulk renewal initiated.');
  };

  const handleDeleteContract = () => {
    // Soft delete logic here
    console.log(`Contract with ID ${deletingContract} marked for deletion.`);
    setDeletingContract(null);
  };

  const handleViewDetails = (contract) => {
    setSelectedContract(contract);
  };

  const filteredContracts = contracts.filter(contract =>
    contract.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedContracts = filteredContracts.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = sortedContracts.slice(indexOfFirstContract, indexOfLastContract);

  const totalPages = Math.ceil(filteredContracts.length / contractsPerPage);

  const createPageArray = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageArray = createPageArray();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Renewals & Expirations Dashboard</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Contracts..."
          value={search}
          onChange={handleSearch}
          className="mb-4 md:mb-0 p-2 border border-gray-300 rounded-lg w-full md:w-1/2"
        />
        <button
          onClick={handleBulkRenewal}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Bulk Renew
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                Contract
                {sortBy === 'name' && (sortDirection === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('expirationDate')}>
                Expiration Date
                {sortBy === 'expirationDate' && (sortDirection === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escalation Alert</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentContracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleViewDetails(contract)}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{contract.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{contract.expirationDate}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{renderStatus(contract.status)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{contract.priceChange}%</td>
                <td className="px-6 py-4 text-sm text-gray-500">{renderEscalationAlert(contract.expirationDate)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeletingContract(contract.id); }}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <div className="join">
          <button
            className="join-item btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button
            className="join-item btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          >
            «
          </button>

          {pageArray.map((page) => (
            <button
              key={page}
              className={`join-item btn ${page === currentPage ? 'btn-active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="join-item btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          >
            »
          </button>
          <button
            className="join-item btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </button>
        </div>
      </div>

      {deletingContract && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this contract?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setDeletingContract(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteContract}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedContract && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Contract Details</h2>
            <p><strong>Name:</strong> {selectedContract.name}</p>
            <p><strong>Expiration Date:</strong> {selectedContract.expirationDate}</p>
            <p><strong>Status:</strong> {renderStatus(selectedContract.status)}</p>
            <p><strong>Price Change:</strong> {selectedContract.priceChange}%</p>
            <p><strong>Details:</strong> {selectedContract.details}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedContract(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const renderStatus = (status) => {
  const statusColors = {
    'In Progress': 'bg-yellow-200 text-yellow-800',
    'Pending Approval': 'bg-blue-200 text-blue-800',
    'Renewed': 'bg-green-200 text-green-800',
    'Expiring Soon': 'bg-red-200 text-red-800',
  };
  return <span className={`px-3 py-1 rounded text-sm ${statusColors[status]}`}>{status}</span>;
};

const renderEscalationAlert = (expirationDate) => {
  const daysLeft = getDaysUntilExpiration(expirationDate);
  if (daysLeft <= 30) {
    return <span className="text-red-600 font-semibold">Escalation Required!</span>;
  }
  return null;
};

const getDaysUntilExpiration = (expirationDate) => {
  const today = new Date();
  const expDate = new Date(expirationDate);
  const diffTime = Math.abs(expDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default RenewalsExpirations;

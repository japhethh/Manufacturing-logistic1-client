import { useState } from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex items-center space-x-2">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageClick(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

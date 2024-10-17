import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";


// Filter component for search and clear functionality
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      className="input mr-2"
      type="text"
      placeholder="Filter by title or year"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <div type="button" className="btn gap-2" onClick={onClear}>
      X
    </div>
  </>
);

// Columns for the DataTable
const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
];

// Sample data
const data = [
  { id: 1, title: "Beetlejuice", year: "1988" },
  { id: 2, title: "Ghostbusters", year: "1984" },
  // Additional sample data...
];

const DataTableTesting = () => {
  const [filterText, setFilterText] = useState(""); // State for search text
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // Filter data based on search text
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.year.toString().includes(filterText)
  );

  // Memoized filter component
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      <DataTable
        title="Movie List"
        columns={columns}
        data={filteredData} // Use filtered data
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // Reset pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo} // Search component
        selectableRows
        dense
      />
    </div>
  );
};

export default DataTableTesting;

import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-dt';

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Furniture' },
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const table = new DataTable('#myTable');
    return () => {
      table.destroy(); // Clean up to avoid memory leaks
    };
  }, [categories]);

  const addCategory = () => {
    if (newCategory.trim()) {
      const id = categories.length ? categories[categories.length - 1].id + 1 : 1; // Increment ID
      setCategories([...categories, { id, name: newCategory }]);
      setNewCategory('');
      setShowModal(false);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  return (
    <div className='bg-white h-auto w-full p-5'>
      <div className="flex justify-between items-center mb-4">
        <button
          className='bg-blue-600 hover:bg-blue-500 duration-200 text-white w-40 h-10 rounded-lg'
          onClick={() => setShowModal(true)}
        >
          Add Category +
        </button>
      </div>
      <div className="divider"></div>
      <table id="myTable" className="display w-full">
        <thead>
          <tr>
            <th style={{ minWidth: '150px' }}>Category ID</th>
            <th style={{ minWidth: '300px' }}>Category Name</th>
            <th style={{ minWidth: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded-lg mx-1">
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded-lg mx-1"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding categories */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={addCategory}
              >
                Add
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded-lg ml-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;

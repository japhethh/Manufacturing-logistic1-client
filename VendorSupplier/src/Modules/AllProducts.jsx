import React from 'react';

const AllProducts = () => {
  // Sample product data with new fields
  const products = [
    {
      id: 1,
      name: 'Product A',
      category: 'Electronics',
      codeName: 'Code A',
      cost: '$5',
      price: '$10',
      quantity: 100,
      image: 'https://images.unsplash.com/photo-1584765172454-22a27d642b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3N3wwfDF8c2VhcmNofDF8fGVsZWN0cm9uaWN8ZW58MHx8fHwxNjI0NzExODkz&ixlib=rb-1.2.1&q=80&w=400', // Sample image URL
    },
    {
      id: 2,
      name: 'Product B',
      category: 'Books',
      codeName: 'Code B',
      cost: '$10',
      price: '$15',
      quantity: 50,
      image: 'https://images.unsplash.com/photo-1544717305-1a12cd1148e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3N3wwfDF8c2VhcmNofDh8fGJvb2t8ZW58MHx8fHwxNjI0NzExODk3&ixlib=rb-1.2.1&q=80&w=400', // Sample image URL
    },
    {
      id: 3,
      name: 'Product C',
      category: 'Clothing',
      codeName: 'Code C',
      cost: '$15',
      price: '$20',
      quantity: 75,
      image: 'https://images.unsplash.com/photo-1542831371-8e8745b8b7c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3N3wwfDF8c2VhcmNofDI4fHxjbG90aGluZ3xlbnwwfHx8fDE2MjQ3MTI2MTU&ixlib=rb-1.2.1&q=80&w=400', // Sample image URL
    },
    {
      id: 4,
      name: 'Product D',
      category: 'Home Appliances',
      codeName: 'Code D',
      cost: '$25',
      price: '$30',
      quantity: 20,
      image: 'https://images.unsplash.com/photo-1589912155545-f5a4b600cd55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3N3wwfDF8c2VhcmNofDEyfHxob21lJTIwYXBwbGlhbmNlfGVufDB8fHx8MTYyNDcxMjYyNw&ixlib=rb-1.2.1&q=80&w=400', // Sample image URL
    },
    {
      id: 5,
      name: 'Product E',
      category: 'Furniture',
      codeName: 'Code E',
      cost: '$50',
      price: '$75',
      quantity: 10,
      image: 'https://images.unsplash.com/photo-1611330341552-ef7fbb9a1500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3N3wwfDF8c2VhcmNofDczfHxlbnwwfHx8fDE2MjQ3MTI3Mjg&ixlib=rb-1.2.1&q=80&w=400', // Sample image URL
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Implement delete logic here
      console.log(`Product with ID ${id} deleted.`);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Images</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Code Name</th>
            <th className="border border-gray-300 p-2">Cost</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2 text-center">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mx-auto" />
              </td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">{product.codeName}</td>
              <td className="border border-gray-300 p-2">{product.cost}</td>
              <td className="border border-gray-300 p-2">{product.price}</td>
              <td className="border border-gray-300 p-2">{product.quantity}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded-lg mx-1"
                  onClick={() => console.log(`Edit product ${product.id}`)} // Placeholder for edit functionality
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded-lg mx-1"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;

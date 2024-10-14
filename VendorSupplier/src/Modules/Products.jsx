import React, { useState } from "react";

const Products = () => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [category, setCategory] = useState("");
  const [barcodeSymbology, setBarcodeSymbology] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [alertQuantity, setAlertQuantity] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [taxType, setTaxType] = useState("");
  const [unit, setUnit] = useState("");
  const [note, setNote] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("code", productCode);
    formData.append("category", category);
    formData.append("barcodeSymbology", barcodeSymbology);
    formData.append("cost", parseFloat(cost));
    formData.append("price", parseFloat(price));
    formData.append("quantity", parseInt(quantity, 10));
    formData.append("alertQuantity", parseInt(alertQuantity, 10));
    formData.append("taxPercentage", parseFloat(taxPercentage));
    formData.append("taxType", taxType);
    formData.append("unit", unit);
    formData.append("note", note);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log([...formData]);
  };

  return (
    <div className="p-6 w-full bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Create Product
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name, Code, and Category in one line */}
        <div className="mb-4 flex flex-wrap space-x-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product name"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <input
              type="text"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product code"
              required
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter category"
              required
            />
          </div>
        </div>

        {/* Barcode Symbology */}
        <div className="mb-4 flex flex-wrap space-x-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Barcode Symbology
            </label>
            <input
              type="text"
              value={barcodeSymbology}
              onChange={(e) => setBarcodeSymbology(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter barcode symbology"
              required
            />
          </div>

          {/* Cost */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Cost
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter cost"
              required
            />
          </div>

          {/* Price */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter price"
              required
            />
          </div>
        </div>

        {/* Quantity, Alert Quantity, Tax %, Tax Type, and Unit */}
        <div className="mb-4 flex flex-wrap space-x-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Alert Quantity
            </label>
            <input
              type="number"
              value={alertQuantity}
              onChange={(e) => setAlertQuantity(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter alert quantity"
              required
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Tax %
            </label>
            <input
              type="number"
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter tax percentage"
              required
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Tax Type
            </label>
            <input
              type="text"
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter tax type"
              required
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter unit"
              required
            />
          </div>
        </div>

        {/* Note */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Add any additional notes here"
          />
        </div>

        {/* Product Images */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>

          <div
            className="mt-1 border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition duration-200"
            onClick={() => document.getElementById("fileInput").click()} // Simulate click on the hidden file input
          >
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" // Hide the input field
            />
            <p className="text-gray-500">
              Drag and drop your images here or click to select files
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 my-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v14a1 1 0 001 1h16a1 1 0 001-1V7m-5 4h2.5a1 1 0 110 2H14m0 0H8m0 0V9m0 4h4m-4-4h4"
              />
            </svg>
          </div>

          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto rounded-lg border border-gray-200 shadow-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default Products;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import NotificationService from "../../services/NotificationService";

const CreatePurchaseOrder = () => {
  const [formData, setFormData] = useState({
    supplier: "",
    orderDate: null,
    items: [{ name: "", quantity: 0, price: 0, discount: 0 }],
    tax: 0,
    notes: "",
    paymentTerm: "",
    approvalStatus: "Pending",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const { apiURL, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await axios.get(`${apiURL}/api/supplier/suppliers`);
      setSuppliers(response.data);
    };
    fetchSuppliers();
  }, [apiURL]);

  const handleSupplierChange = (supplierId) => {
    const selectedSupplier = suppliers.find(
      (supplier) => supplier._id === supplierId
    );
    setFormData({ ...formData, supplier: supplierId });
    if (selectedSupplier) {
      setSelectedMaterials(selectedSupplier.materialSupplied);
    } else {
      setSelectedMaterials([]);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] =
      value === ""
        ? ""
        : field === "quantity" || field === "price" || field === "discount"
        ? parseFloat(value) || ""
        : value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleMaterialChange = (index, materialName) => {
    const selectedMaterial = selectedMaterials.find(
      (material) => material.materialName === materialName
    );
    if (selectedMaterial) {
      const updatedItems = [...formData.items];
      updatedItems[index].name = materialName;
      updatedItems[index].price = selectedMaterial.pricePerUnit; // Set the price based on selected material
      setFormData({ ...formData, items: updatedItems });
    }
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { name: "", quantity: 0, price: 0, discount: 0 },
      ],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleReset = () => {
    setFormData({
      supplier: "",
      orderDate: null,
      items: [{ name: "", quantity: 0, price: 0, discount: 0 }],
      tax: 0,
      notes: "",
      paymentTerm: "",
      approvalStatus: "Pending",
    });
    setSelectedMaterials([]);
  };

  const calculateItemTotal = (item) => {
    const discountAmount = (item.price * item.discount) / 100;
    return (item.price - discountAmount) * item.quantity;
  };

  const calculateSummary = () => {
    const subtotal = formData.items.reduce(
      (sum, item) => sum + calculateItemTotal(item),
      0
    );
    const taxAmount = (subtotal * formData.tax) / 100;
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const generatePurchaseOrderNumber = () => {
    return `PO-${Date.now()}`; // Example: PO-1630358395431
  };

  const validateForm = () => {
    if (!formData.supplier) {
      NotificationService.warning("Please select a supplier.", {
        position: "top-center",
      });
      return false;
    }

    if (!formData.orderDate) {
      NotificationService.warning("Please select an order date.", {
        position: "top-center",
      });
      return false;
    }

    if (
      formData.items.length === 0 ||
      formData.items.some(
        (item) => !item.name || item.quantity <= 0 || item.price <= 0
      )
    ) {
      NotificationService.warning(
        "Please provide valid items with quantity and price.",
        {
          position: "top-center",
        }
      );
      return false;
    }

    if (!formData.paymentTerm) {
      NotificationService.warning("Please provide a payment term.", {
        position: "top-center",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const purchaseOrderNumber = generatePurchaseOrderNumber();
      const { total } = calculateSummary();

      const purchaseOrderData = {
        purchaseOrderNumber,
        supplier: formData.supplier,
        items: formData.items.map((item) => ({
          name: item.name,
          quantity: parseFloat(item.quantity),
          price: parseFloat(item.price),
          discount: parseFloat(item.discount),
          totalPrice: calculateItemTotal(item),
        })),
        tax: parseFloat(formData.tax) || 0,
        totalAmount: total,
        notes: formData.notes,
        orderDate: formData.orderDate,
        paymentTerm: formData.paymentTerm,
        approvalStatus: formData.approvalStatus,
      };

      const response = await axios.post(
        `${apiURL}/api/purchase-order/create`,
        purchaseOrderData,
        {
          headers: { token: token },
        }
      );
      NotificationService.success("Purchase Order Created");
      handleReset();
      navigate(`/purchase_orders/view_po/${response.data._id}`);
    } catch (error) {
      console.error("Error creating purchase order:", error);
      NotificationService.error("Error creating purchase order");
    }
  };

  const { subtotal, taxAmount, total } = calculateSummary();

  return (
    <div className="container mx-auto px-4 py-6">
      <form>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#07074D] mb-4 md:mb-0">
            Create Purchase Order
          </h1>
          <div className="flex flex-col md:flex-row md:space-x-3 mb-6">
            <div className="flex justify-center md:justify-start space-x-3 mb-3 md:mb-0">
              <button
                className="rounded-md bg-red-500 text-white py-3 px-6 text-sm font-semibold hover:bg-red-600 transition-all duration-300 shadow-md transform hover:scale-105"
                onClick={handleReset}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-yellow-500 text-white py-3 px-6 text-sm font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-md transform hover:scale-105"
                onClick={handleReset}
                type="button"
              >
                Reset
              </button>
              <button
                className="rounded-md bg-green-500 text-white py-3 px-6 text-sm font-semibold hover:bg-green-600 transition-all duration-300 shadow-md transform hover:scale-105"
                onClick={handleSubmit}
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Vendor Selection */}
        <div className="mb-4">
          <label
            htmlFor="supplier"
            className="block text-base font-medium text-[#07074D]"
          >
            Vendor Selection
          </label>
          <select
            id="supplier"
            value={formData.supplier}
            onChange={(e) => handleSupplierChange(e.target.value)}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.supplierName}
              </option>
            ))}
          </select>
        </div>

        {/* Order Date */}
        <div className="mb-4">
          <label
            htmlFor="orderDate"
            className="block text-base font-medium text-[#07074D] mb-2"
          >
            Order Date
          </label>
          <input
            type="date"
            id="orderDate"
            value={
              formData.orderDate
                ? formData.orderDate.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setFormData({ ...formData, orderDate: new Date(e.target.value) })
            }
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            required
          />
        </div>

        {/* Items Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#07074D] mb-4">Items</h2>
          {formData.items.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row mb-4">
              <select
                value={item.name}
                onChange={(e) => handleMaterialChange(index, e.target.value)}
                className="w-full md:w-1/3 rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md md:mr-2 mb-2 md:mb-0"
              >
                <option value="">Select Item</option>
                {selectedMaterials.map((material) => (
                  <option
                    key={material.materialName}
                    value={material.materialName}
                  >
                    {material.materialName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleInputChange(index, "quantity", e.target.value)
                }
                className="w-full md:w-1/3 rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md md:mr-2 mb-2 md:mb-0"
                placeholder="Quantity"
                min="0"
                required
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  handleInputChange(index, "price", e.target.value)
                }
                className="w-full md:w-1/3 rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mb-2 md:mb-0"
                placeholder="Price"
                min="0"
                required
              />
              <input
                type="number"
                value={item.discount}
                onChange={(e) =>
                  handleInputChange(index, "discount", e.target.value)
                }
                className="w-full md:w-1/3 rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mb-2 md:mb-0"
                placeholder="Discount (%)"
                min="0"
                max="100"
              />
              <button
                onClick={() => handleRemoveItem(index)}
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition mt-2 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddItem}
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Add Item
          </button>
        </div>

        {/* Summary Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#07074D] mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>{taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Additional Notes and Payment Terms */}
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-base font-medium text-[#07074D] mb-2"
          >
            Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="paymentTerm"
            className="block text-base font-medium text-[#07074D] mb-2"
          >
            Payment Term
          </label>
          <input
            type="text"
            id="paymentTerm"
            value={formData.paymentTerm}
            onChange={(e) =>
              setFormData({ ...formData, paymentTerm: e.target.value })
            }
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            placeholder="Payment Term"
            required
          />
        </div>

        <div className="flex justify-between">
          <span className="text-base font-medium text-[#07074D]">
            Approval Status:
          </span>
          <span className="text-base font-medium text-[#07074D]">
            {formData.approvalStatus}
          </span>
        </div>
      </form>
    </div>
  );
};

export default CreatePurchaseOrder;

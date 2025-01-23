import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import NotificationService from "../../services/NotificationService";
import Store from "../../context/Store";
const CreatePurchaseOrder = () => {
  const [formData, setFormData] = useState({
    supplier: "",
    orderDate: null,
    items: [{ name: "", productId: "", quantity: 0, price: 0, discount: 0 }],
    tax: 0,
    category: "",
    notes: "",
    paymentTerm: "",
    paymentMethod: "",
    approvalStatus: "Pending",
    reason: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const { apiURL } = useContext(UserContext);
  const { token } = Store();
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
      updatedItems[index].productId = selectedMaterial._id;
      updatedItems[index].price = selectedMaterial.pricePerUnit;
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
      category: "",
      notes: "",
      paymentTerm: "",
      paymentMethod: "",
      approvalStatus: "Pending",
      reason: "",
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
    console.log(formData);
    if (!validateForm()) {
      return;
    }

    try {
      const { total } = calculateSummary();

      const purchaseOrderData = {
        // purchaseOrderNumber,
        supplier: formData.supplier,
        items: formData.items.map((item) => ({
          name: item.name,
          productId: item.productId,
          quantity: parseFloat(item.quantity),
          price: parseFloat(item.price),
          discount: parseFloat(item.discount),
          totalPrice: calculateItemTotal(item),
        })),
        tax: parseFloat(formData.tax) || 0,
        totalAmount: total,
        notes: formData.notes,
        category: formData.category,
        orderDate: formData.orderDate,
        paymentTerm: formData.paymentTerm,
        approvalStatus: formData.approvalStatus,
        reason: formData.reason,
        paymentDetails: {
          paymentMethod: formData.paymentMethod,
        },
      };

      const response = await axios.post(
        `${apiURL}/api/purchase-order/create`,
        purchaseOrderData,
        {
          headers: { token: token },
        }
      );
      NotificationService.success(response?.data.msg)
      NotificationService.success("Purchase Order Created");
      handleReset();
      navigate(`/purchase_orders/view_po/${response.data._id}`);
    } catch (error) {
      console.error("Error creating purchase order:", error);
      NotificationService.error(error.response.data.message);
    }
  };

  const { subtotal, taxAmount, total } = calculateSummary();

  return (
    <div className="container mx-auto px-4 py-6">
      <form>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#07074D]">
            Create Purchase Order
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vendor Selection */}
          <div>
            <label
              htmlFor="supplier"
              className="block text-base font-medium text-[#07074D]"
            >
              Vendor Selection <span className="text-red-500">*</span>
            </label>
            <select
              id="supplier"
              value={formData.supplier}
              onChange={(e) => handleSupplierChange(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base font-medium text-[#6B7280] outline-none"
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
          <div>
            <label
              htmlFor="orderDate"
              className="block text-base font-medium text-[#07074D]"
            >
              Order Date <span className="text-red-500">*</span>
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
                setFormData({
                  ...formData,
                  orderDate: new Date(e.target.value),
                })
              }
              className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#07074D] mb-4">Items</h2>
          {formData.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4"
            >
              <div>
                <label
                  htmlFor={`material-${index}`}
                  className="block text-base font-medium text-[#07074D]"
                >
                  Material <span className="text-red-500">*</span>
                </label>
                <select
                  id={`material-${index}`}
                  value={item.name}
                  onChange={(e) => handleMaterialChange(index, e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
                >
                  <option value="">Select Item</option>
                  {selectedMaterials.map((material, index) => (
                    <option key={index} value={material.materialName}>
                      {material.materialName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`quantity-${index}`}
                  className="block text-base font-medium text-[#07074D]"
                >
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  value={item.quantity}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                  className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor={`price-${index}`}
                  className="block text-base font-medium text-[#07074D]"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id={`price-${index}`}
                  value={item.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                  className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor={`discount-${index}`}
                  className="block text-base font-medium text-[#07074D]"
                >
                  Discount % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id={`discount-${index}`}
                  value={item.discount}
                  onChange={(e) =>
                    handleInputChange(index, "discount", e.target.value)
                  }
                  className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
                />
              </div>

              {/* Remove Button */}
              <div className="md:col-span-4 text-right">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="rounded-md bg-red-500 text-white py-2 px-4 text-base font-semibold hover:bg-red-600 transition-all duration-300 shadow-md transform hover:scale-105"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}

          {/* Add Item Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddItem}
              className="rounded-md bg-green-500 text-white py-2 px-4 text-base font-semibold hover:bg-green-600 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              + Add Another Item
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium text-[#07074D]"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Capital Expenditures">Capital Expenditures</option>
              <option value="Operational Expenses">Operational Expenses</option>
            </select>
          </div>

          {/* Payment Term */}
          <div>
            <label
              htmlFor="paymentTerm"
              className="block text-base font-medium text-[#07074D]"
            >
              Payment Term <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="paymentTerm"
              value={formData.paymentTerm}
              onChange={(e) =>
                setFormData({ ...formData, paymentTerm: e.target.value })
              }
              className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label
              htmlFor="paymentTerm"
              className="block text-base font-medium text-[#07074D]"
            >
              Payment Term <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
            >
              <option value="" disabled selected>
                Select option
              </option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="GCash">GCash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Notes */}
          <div className="md:col-span-2">
            <label
              htmlFor="notes"
              className="block text-base font-medium text-[#07074D]"
            >
              Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
              rows={3}
            />
          </div>

          {/* Reason */}
          <div className="md:col-span-2">
            <label
              htmlFor="reason"
              className="block text-base font-medium text-[#07074D]"
            >
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              className="w-full rounded-md border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
              rows={3}
            />
          </div>
        </div>

        {/* Total Summary */}
        <div className="md:col-span-2 mt-6 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-[#07074D] mb-4">Summary</h3>
          <p>Subtotal: ₱{subtotal.toFixed(2)}</p>
          <p>Tax: ₱{taxAmount.toFixed(2)}</p>
          <p className="font-bold">Total: ₱{total.toFixed(2)}</p>
        </div>

        {/* Submit and Reset Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 rounded-md bg-gray-300 text-[#07074D] hover:bg-gray-400"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePurchaseOrder;

// const handleReset = () => {
//   setFormData({
//     supplier: "",
//     orderDate: null,
//     items: [{ name: "", quantity: 0, price: 0, discount: 0 }],
//     tax: 0,
//     notes: "",
//     paymentTerm: "",
//     approvalStatus: "Pending",
//   });
//   setSelectedMaterials([]);
// };

// <button
// className="rounded-md bg-red-500 text-white py-3 px-6 text-sm font-semibold hover:bg-red-600 transition-all duration-300 shadow-md transform hover:scale-105"
// onClick={handleReset}
// type="button"
// >
// Cancel
// </button>

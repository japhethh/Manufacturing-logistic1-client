import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import NotificationService from "../services/NotificationService";

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
    const selectedSupplier = suppliers.find(supplier => supplier._id === supplierId);
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
    const selectedMaterial = selectedMaterials.find(material => material.materialName === materialName);
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
          headers: {
            token: token,
          },
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#07074D]">
            Create Purchase Order
          </h1>
          <div className="space-x-3">
            <button
              className="rounded-md bg-red-500 text-white py-2 px-6 text-sm font-medium hover:bg-red-600 transition"
              onClick={handleReset}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-yellow-500 text-white py-2 px-6 text-sm font-medium hover:bg-yellow-600 transition"
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>
            <button
              className="rounded-md bg-green-500 text-white py-2 px-6 text-sm font-medium hover:bg-green-600 transition"
              onClick={handleSubmit}
              type="button"
            >
              Save
            </button>
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

        {/* Item Selection and Quantity Entry */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#07074D]">Items</h2>
          {formData.items.map((item, index) => (
            <div key={index} className="flex flex-col mb-4">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-[#6B7280]">
                    Material
                  </label>
                  <select
                    value={item.name}
                    onChange={(e) => handleMaterialChange(index, e.target.value)}
                    className="rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  >
                    <option value="">Select Item</option>
                    {selectedMaterials.map((material) => (
                      <option key={material._id} value={material.materialName}>
                        {material.materialName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-[#6B7280]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                    className="rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-[#6B7280]">
                    Price
                  </label>
                  <input
                    type="number"
                    value={item.price}
                    readOnly
                    className="rounded-md border border-[#e0e0e0] bg-gray-200 py-2 px-4 text-base font-medium text-[#6B7280] outline-none"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-[#6B7280]">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleInputChange(index, "discount", e.target.value)}
                    className="rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="rounded-md bg-red-500 text-white px-4 py-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 rounded-md bg-blue-500 text-white px-4 py-2"
          >
            Add Item
          </button>
        </div>

        {/* Summary Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#07074D]">Summary</h2>
          <div className="flex justify-between">
            <div>Subtotal:</div>
            <div>${subtotal.toFixed(2)}</div>
          </div>
          <div className="flex justify-between">
            <div>Tax:</div>
            <div>${taxAmount.toFixed(2)}</div>
          </div>
          <div className="flex justify-between font-bold">
            <div>Total:</div>
            <div>${total.toFixed(2)}</div>
          </div>
        </div>

        {/* Notes and Payment Term */}
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
          />
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
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePurchaseOrder;

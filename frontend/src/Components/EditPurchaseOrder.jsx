import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import NotificationService from "../services/NotificationService";

const EditPurchaseOrder = () => {
  const [formData, setFormData] = useState({
    supplier: "",
    orderDate: null,
    items: [{ name: "", quantity: 0, price: 0, discount: 0 }],
    tax: 0,
    notes: "",
    paymentTerm: "",
    approvalStatus: "Pending",
  });
  const { id } = useParams();
  // const [purchaseOrder, setPurchaseOrder] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const { apiURL, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await axios.get(`${apiURL}/api/supplier/suppliers`);
      setSuppliers(response.data);
    };

    const fetchPurchaseOrder = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/purchase-order/edit/${id}`
        );
        const order = response.data;

        // Update formData with fetched purchase order details
        setFormData({
          supplier: order.supplier,
          orderDate: new Date(order.orderDate), // Convert to Date object
          items: order.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount,
          })),
          tax: order.tax,
          notes: order.notes,
          paymentTerm: order.paymentTerm,
          approvalStatus: order.approvalStatus,
        });
        // setPurchaseOrder(order);
      } catch (error) {
        console.error("Error fetching purchase order:", error);
        NotificationService.error("Error fetching purchase order");
      }
    };

    fetchSuppliers();
    fetchPurchaseOrder();
  }, [apiURL, id]);

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
      return; // Stop the submission if the validation fails
    }

    try {
      const purchaseOrderNumber = generatePurchaseOrderNumber();
      const { total } = calculateSummary();

      const purchaseOrderData = {
        purchaseOrderNumber,
        supplier: formData.supplier,
        items: formData.items.map((item) => ({
          name: item.name,
          quantity: parseFloat(item.quantity), // Ensure quantity is a number
          price: parseFloat(item.price), // Ensure price is a number
          discount: parseFloat(item.discount), // Ensure discount is a number
          totalPrice: calculateItemTotal(item), // Calculate the total price
        })),
        tax: parseFloat(formData.tax) || 0, // Ensure tax is a number
        totalAmount: total, // Use the calculated total amount
        notes: formData.notes, // Include notes here
        orderDate: formData.orderDate,
        paymentTerm: formData.paymentTerm,
        approvalStatus: formData.approvalStatus,
      };

      const response = await axios.put(
        `${apiURL}/api/purchase-order/update/${id}`,
        purchaseOrderData,
        {
          headers: {
            token: token,
          },
        }
      );
      NotificationService.success(response.data.message);
      handleReset(); // Reset the form after successful submission
      navigate(`/purchase_orders/view_po/${response.data.data}`); // Navigate to the purchase order view
    } catch (error) {
      console.error("Error creating purchase order:", error);
      NotificationService.error("Error creating purchase order");
    }
  };

  const { subtotal, taxAmount, total } = calculateSummary();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Form Section */}
      <form>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#07074D]">
            Edit Purchase Order
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
              Update
            </button>
          </div>
        </div>

        <div className="flex  gap-2"> 
          {/* Vendor Selection */}
          <div className="mb-4 flex-1">
            <label
              htmlFor="supplier"
              className="block text-base font-medium text-[#07074D] mb-2"
            >
              Vendor Selection
            </label>
            <select
              id="supplier"
              value={formData.supplier}
              onChange={(e) =>
                setFormData({ ...formData, supplier: e.target.value })
              }
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
          <div className="mb-4 flex-1">
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
                setFormData({
                  ...formData,
                  orderDate: new Date(e.target.value),
                })
              }
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-base font-medium text-[#07074D] mb-2">
            Item Selection and Quantity Entry
          </label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex space-x-4 mb-4 items-center">
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-[#6B7280]">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  className="rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-[#6B7280]">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                  className="rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  min="1"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-[#6B7280]">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                  className="rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  min="0"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-[#6B7280]">
                  Discount (%)
                </label>
                <input
                  type="number"
                  placeholder="Discount (%)"
                  value={item.discount}
                  onChange={(e) =>
                    handleInputChange(index, "discount", e.target.value)
                  }
                  className="rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  min="0"
                  max="100"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="rounded-md bg-red-500 text-white py-1 px-3"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-3 rounded-md bg-blue-500 text-white py-2 px-4"
          >
            Add Item
          </button>
        </div>

        {/* Notes and Payment Term */}
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-base font-medium text-[#07074D]"
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
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="paymentTerm"
            className="block text-base font-medium text-[#07074D]"
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
        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#07074D]">Summary</h2>
          <p className="text-base font-medium text-[#6B7280]">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
          <p className="text-base font-medium text-[#6B7280]">
            Tax: ${taxAmount.toFixed(2)}
          </p>
          <p className="text-lg font-semibold text-[#07074D]">
            Total: ${total.toFixed(2)}
          </p>
        </div>
      </form>
    </div>
  );
};

export default EditPurchaseOrder;

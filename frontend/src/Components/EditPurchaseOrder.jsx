import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
    <>
      <div className="breadcrumbs text-sm ml-3">
        <ul>
          <li>
            <NavLink to="/purchase_orders/view_po/:id">
              <a className="font-Roboto">Edit Purchase Order</a>
            </NavLink>
          </li>
          <li className="text-blue-600">
            <a className="font-Roboto">Edit</a>
          </li>
        </ul>
      </div>
      <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
        {/* Form Header */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#07074D] font-Roboto">
            Edit Purchase Order
          </h1>
          <div className="space-x-4">
            <button
              className="rounded-lg bg-red-500 text-white font-Roboto py-2 px-6 font-medium hover:bg-red-600 transition"
              onClick={handleReset}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-yellow-500 text-white font-Roboto py-2 px-6 font-medium hover:bg-yellow-600 transition"
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>
            <button
              className="rounded-lg bg-green-500 text-white font-Roboto py-2 px-6 font-medium hover:bg-green-600 transition"
              onClick={handleSubmit}
              type="button"
            >
              Update
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Vendor Selection */}
            <div>
              <label
                htmlFor="supplier"
                className="block text-base font-semibold text-[#07074D] mb-2 font-Roboto"
              >
                Vendor Selection
              </label>
              <select
                id="supplier"
                value={formData.supplier}
                onChange={(e) =>
                  setFormData({ ...formData, supplier: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-base text-gray-700 font-Roboto outline-none focus:ring-2 focus:ring-blue-400"
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
            <div>
              <label
                htmlFor="orderDate"
                className="block text-base font-semibold text-[#07074D] mb-2 font-Roboto"
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
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-base text-gray-700 font-Roboto outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Item Entry Section */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-[#07074D] mb-3 font-Roboto">
              Item Selection and Quantity Entry
            </label>
            {formData.items.map((item, index) => (
              <div key={index} className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 font-Roboto mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 text-base text-gray-700 font-Roboto outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm text-gray-700 font-Roboto mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 text-base text-gray-700 font-Roboto outline-none focus:ring-2 focus:ring-blue-400"
                    min="1"
                    required
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm text-gray-700 mb-1 font-Roboto">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 text-base text-gray-700 font-Roboto outline-none focus:ring-2 focus:ring-blue-400"
                    min="0"
                    required
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm text-gray-700 font-Roboto mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    placeholder="%"
                    value={item.discount}
                    onChange={(e) =>
                      handleInputChange(index, "discount", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 text-base text-gray-700 font-Roboto outline-none focus:ring-2 focus:ring-blue-400"
                    min="0"
                    max="100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="rounded-lg bg-red-500 text-white font-Roboto py-2 px-4 hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="rounded-lg bg-blue-500 text-white font-Roboto py-2 px-4 hover:bg-blue-600 transition"
            >
              Add Item
            </button>
          </div>

          {/* Notes and Payment Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="notes"
                className="block text-base font-semibold text-[#07074D] font-Roboto mb-2"
              >
                Notes
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-base text-gray-700 font-Roboto outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="paymentTerm"
                className="block text-base font-semibold text-[#07074D] font-Roboto mb-2"
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
                className="w-full rounded-lg border border-gray-300 py-3 px-4 text-base text-gray-700 font-Roboto outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#07074D] font-Roboto">
              Summary
            </h2>
            <p className="text-base text-gray-700 font-Roboto">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <p className="text-base text-gray-700 font-Roboto">
              Tax: ${taxAmount.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-[#07074D] font-Roboto">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPurchaseOrder;

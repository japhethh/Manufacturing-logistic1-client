import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const CreateSupplier = () => {
  const [rating, setRating] = useState(0);

  const handleReset = () => {
    setRating(0); // Reset rating to 0
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>

      <div className="p-2 shadow-md ">
        <div className="border-b-2 my-2">
          <div>
            <button className="px-4 text-sm rounded-full bg-blue-700 text-white mb-2 flex justify-between items-center gap-2 py-3 font-semibold">
              <h1>Create Employee</h1>{" "}
              <span>
                <FaCheck />
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-5/6 bg-white">
            <form>
              <div className="flex justify-between items-center gap-3">
                <div className="mb-5 flex-1">
                  <label
                    for="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Supplier Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5 flex-1">
                  <label
                    for="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Supplier Code
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter your Supplier Code"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="mb-5 flex-1">
                  <label
                    for="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="999-999-9999"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5 flex-1">
                  <label
                    for="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Supplier Email
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="EnterYourEmail@gmail.com"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Contact Supplier
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="999-999-9999"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              {/* ADDRESS */}
              <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                  Address Details
                </label>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="area"
                        id="area"
                        placeholder="Enter area"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Enter city"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        placeholder="Enter state"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="post-code"
                        id="post-code"
                        placeholder="Post Code"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment */}
              <div className="flex justify-between items-center gap-10">
                <div className="mb-5 flex-1">
                  <label
                    for="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Contact Person
                  </label>
                  <select className="select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                    <option disabled selected>
                      Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>
                </div>
                <div className="mb-5 flex-1">
                  <label
                    htmlFor="rating"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Rating
                  </label>
                  <div className="flex space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label
                        key={star}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          className="hidden"
                          onClick={() => setRating(star)}
                        />
                        <svg
                          className={`w-6 h-6 ${
                            star <= rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l2.5 7h7l-5.5 4 2.5 7-5.5-4-5.5 4 2.5-7-5.5-4h7z" />
                        </svg>
                      </label>
                    ))}

                    <button
                      onClick={handleReset}
                      className="text-gray-500 hover:text-black/80 duration-200 text-xs"
                    >
                      Reset Rating
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {/* Material Supplied */}

                <div className="mb-5 flex-1">
                  <label
                    for="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Material Supply
                  </label>
                  <select className="select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                    <option disabled selected>
                      Material Type
                    </option>
                    <option>Steel Sheet</option>
                    <option>Burger</option>
                    <option>V8 Engine</option>
                  </select>
                </div>
                {/* AUTHENTICATION */}
                <div className="flex justify-between items-center gap-3">
                  <div className="mb-5 flex-1">
                    <label
                      for="name"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="sampleEmail@gmail.com"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5 flex-1">
                    <label
                      for="phone"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Secret"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSupplier;

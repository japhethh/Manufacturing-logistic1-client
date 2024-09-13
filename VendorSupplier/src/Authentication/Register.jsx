import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const inputClasses = "px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClasses = "text-sm font-medium text-gray-700";
const sectionTitleClasses = "mb-4 text-xl font-semibold text-gray-800";
const buttonBaseClasses = "px-4 py-2 font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const submitButtonClasses = `${buttonBaseClasses} text-white bg-blue-500 hover:bg-blue-600`;
const draftButtonClasses = `${buttonBaseClasses} text-blue-500 border border-blue-500 hover:bg-blue-50`;

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col items-center max-w-4xl px-8 py-10 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">Supplier Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-6">
        {/* Basic Information */}
        <section>
          <h2 className={sectionTitleClasses}>Basic Information</h2>

          <div className="flex flex-col">
            <label htmlFor="supplierName" className={labelClasses}>Supplier Name:</label>
            <input 
              type="text" 
              id="supplierName" 
              name="supplierName" 
              className={inputClasses}
              placeholder="Enter supplier name"
              {...register('supplierName', { required: 'Supplier name is required' })}
              aria-required="true"
            />
            {errors.supplierName && <p className="text-sm text-red-500">{errors.supplierName.message}</p>}
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="supplierCode" className={labelClasses}>Supplier Code:</label>
            <input 
              type="text" 
              id="supplierCode" 
              name="supplierCode" 
              className={inputClasses}
              placeholder="Enter supplier code"
              {...register('supplierCode', { required: 'Supplier code is required' })}
              aria-required="true"
            />
            {errors.supplierCode && <p className="text-sm text-red-500">{errors.supplierCode.message}</p>}
          </div>
          
          <div className="flex flex-col mt-4">
            <label htmlFor="contactPerson" className={labelClasses}>Contact Person:</label>
            <input 
              type="text" 
              id="contactPerson" 
              name="contactPerson" 
              className={inputClasses}
              placeholder="Enter contact person's name"
              {...register('contactPerson', { required: 'Contact person is required' })}
              aria-required="true"
            />
            {errors.contactPerson && <p className="text-sm text-red-500">{errors.contactPerson.message}</p>}
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="contactEmail" className={labelClasses}>Contact Email:</label>
            <input 
              type="email" 
              id="contactEmail" 
              name="contactEmail" 
              className={inputClasses}
              placeholder="Enter contact email"
              {...register('contactEmail', { required: 'Contact email is required' })}
              aria-required="true"
            />
            {errors.contactEmail && <p className="text-sm text-red-500">{errors.contactEmail.message}</p>}
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="contactPhone" className={labelClasses}>Contact Phone:</label>
            <input 
              type="tel" 
              id="contactPhone" 
              name="contactPhone" 
              className={inputClasses}
              placeholder="Enter contact phone number"
              {...register('contactPhone', { required: 'Contact phone is required' })}
              aria-required="true"
            />
            {errors.contactPhone && <p className="text-sm text-red-500">{errors.contactPhone.message}</p>}
          </div>
          
          {/* Address */}
          <div className="flex flex-col mt-4">
            <label htmlFor="address.street" className={labelClasses}>Street Address:</label>
            <input 
              type="text" 
              id="address.street" 
              name="address.street" 
              className={inputClasses}
              placeholder="Enter street address"
              {...register('address.street')}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="address.city" className={labelClasses}>City:</label>
            <input 
              type="text" 
              id="address.city" 
              name="address.city" 
              className={inputClasses}
              placeholder="Enter city"
              {...register('address.city')}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="address.state" className={labelClasses}>State:</label>
            <input 
              type="text" 
              id="address.state" 
              name="address.state" 
              className={inputClasses}
              placeholder="Enter state"
              {...register('address.state')}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="address.zipCode" className={labelClasses}>ZIP Code:</label>
            <input 
              type="text" 
              id="address.zipCode" 
              name="address.zipCode" 
              className={inputClasses}
              placeholder="Enter ZIP code"
              {...register('address.zipCode')}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="address.country" className={labelClasses}>Country:</label>
            <input 
              type="text" 
              id="address.country" 
              name="address.country" 
              className={inputClasses}
              placeholder="Enter country"
              {...register('address.country')}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="paymentTerms" className={labelClasses}>Payment Terms:</label>
            <input 
              type="text" 
              id="paymentTerms" 
              name="paymentTerms" 
              className={inputClasses}
              placeholder="Enter payment terms"
              {...register('paymentTerms', { required: 'Payment terms are required' })}
              aria-required="true"
            />
            {errors.paymentTerms && <p className="text-sm text-red-500">{errors.paymentTerms.message}</p>}
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="rating" className={labelClasses}>Rating:</label>
            <input 
              type="number" 
              id="rating" 
              name="rating" 
              min="1" 
              max="5" 
              className={inputClasses}
              placeholder="Rate from 1 to 5"
              {...register('rating')}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="materialSupplied" className={labelClasses}>Material Supplied (IDs):</label>
            <input 
              type="text" 
              id="materialSupplied" 
              name="materialSupplied" 
              className={inputClasses}
              placeholder="Enter material IDs"
              {...register('materialSupplied')}
            />
          </div>
        </section>

        {/* Email and Password */}
        <section>
          <h2 className={sectionTitleClasses}>EMAIL AND PASSWORD</h2>

          <div className="flex flex-col mt-4">
            <label htmlFor="email" className={labelClasses}>Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className={inputClasses}
              placeholder="Enter email address"
              {...register('email', { required: 'Email is required' })}
              aria-required="true"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="password" className={labelClasses}>Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className={inputClasses}
              placeholder="Enter password"
              {...register('password', { required: 'Password is required' })}
              aria-required="true"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
        </section>

        {/* Company Details */}
        <section>
          <h2 className={sectionTitleClasses}>Company Details</h2>

          <div className="flex flex-col mt-4">
            <label htmlFor="companyName" className={labelClasses}>Company Name:</label>
            <input 
              type="text" 
              id="companyName" 
              name="companyName" 
              className={inputClasses}
              placeholder="Enter company name"
              {...register('companyName')}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="companyWebsite" className={labelClasses}>Company Website:</label>
            <input 
              type="url" 
              id="companyWebsite" 
              name="companyWebsite" 
              className={inputClasses}
              placeholder="Enter company website URL"
              {...register('companyWebsite')}
            />
          </div>
        </section>

        {/* Tax ID Field */}
        <section>
          <div className="flex flex-col mt-4">
            <label htmlFor="taxId" className={labelClasses}>Tax ID:</label>
            <input 
              type="text" 
              id="taxId" 
              name="taxId" 
              className={inputClasses}
              placeholder="Enter tax ID"
              {...register('taxId')}
            />
          </div>
        </section>

        {/* Submit Buttons */}
        <section className="flex gap-4 mt-6">
          <button 
            type="submit" 
            className={submitButtonClasses}
          >
            Submit for Review
          </button>
          <button 
            type="button" 
            className={draftButtonClasses}
          >
            Save as Draft
          </button>
        </section>

        {/* Additional Notes */}
        <section>
          <h2 className={sectionTitleClasses}>Additional Notes</h2>

          <div className="flex flex-col">
            <label htmlFor="notes" className={labelClasses}>Notes:</label>
            <textarea 
              id="notes" 
              name="notes" 
              rows="3" 
              placeholder="Any additional information or comments"
              className={inputClasses}
              {...register('notes')}
            ></textarea>
          </div>
        </section>

      </form>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-500">Already have an account? </span>
        <Link to="/" className="text-blue-500 hover:text-blue-600">Login</Link>
      </div>
    </div>
  );
};

export default Register;

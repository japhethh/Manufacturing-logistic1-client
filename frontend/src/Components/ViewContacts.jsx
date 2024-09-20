import React, { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const ViewContacts = () => {
  // Example static contact data with useState
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+123456789',
      company: 'ABC Logistics',
      role: 'Logistics Manager',
      relationshipType: 'Vendor',
      contractDetails: 'Contract #1234, valid until 2025',
      status: 'Active',
      history: [
        'Email sent on 2023-01-10',
        'Call on 2023-02-15 regarding shipment delay',
        'Contract renewal discussed on 2023-03-01',
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+987654321',
      company: 'XYZ Suppliers',
      role: 'Procurement Specialist',
      relationshipType: 'Supplier',
      contractDetails: 'Contract #5678, expires 2024',
      status: 'Pending',
      history: [
        'Initial contact made on 2023-01-20',
        'Price negotiation on 2023-02-05',
      ],
    },
  ]);

  // State for the new contact form
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    relationshipType: '',
    contractDetails: '',
    status: 'Pending',
    history: [],
  });

  // Add new contact
  const addContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      setContacts([
        ...contacts,
        { ...newContact, id: contacts.length + 1 },
      ]);
      setNewContact({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        relationshipType: '',
        contractDetails: '',
        status: 'Pending',
        history: [],
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  // Delete a contact by id
  const deleteContact = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this contact?');
    if (confirmed) {
      setContacts(contacts.filter((contact) => contact.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">View Contacts</h2>

      {/* Add Contact Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Contact</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Company"
            value={newContact.company}
            onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Role"
            value={newContact.role}
            onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Relationship Type"
            value={newContact.relationshipType}
            onChange={(e) => setNewContact({ ...newContact, relationshipType: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Contract Details"
            value={newContact.contractDetails}
            onChange={(e) => setNewContact({ ...newContact, contractDetails: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={addContact}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 relative">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center">
                    {contact.name[0]}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.role}</p>
                </div>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  aria-label="Delete contact"
                >
                  <FaTrash className="h-6 w-6" />
                </button>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Company:</strong> {contact.company}</p>
                <p><strong>Relationship Type:</strong> {contact.relationshipType}</p>
                <p><strong>Contract Details:</strong> {contact.contractDetails}</p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                      contact.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {contact.status}
                  </span>
                </p>
                <div className="pt-2">
                  <strong>History:</strong>
                  <ul className="list-disc ml-6 text-gray-600">
                    {contact.history.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No contacts available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewContacts;

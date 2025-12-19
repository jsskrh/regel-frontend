"use client";

import { useState } from "react";

const RightSideBar = () => {
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState(["Alice", "Bob", "Charlie"]);
  const [selectedContact, setSelectedContact] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const handleSendMessage = () => {
    if (message && selectedContact) {
      setMessageHistory([
        ...messageHistory,
        { contact: selectedContact, message },
      ]);
      setMessage("");
    }
  };

  return (
    // <div className="bg-gray-100 h-screen w-20 md:w-64 p-4 fixed top-0 right-0 hidden md:block">
    <div className="bg-gray-50 min-h-screen w-20 md:w-64 p-4 top-0 right-0 hidden md:block">
      <h2 className="text-gray-600 text-2xl mb-4">SMS Control Panel</h2>

      {/* Select Contact */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Select Contact</label>
        <select
          value={selectedContact}
          onChange={(e) => setSelectedContact(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Choose a contact</option>
          {contacts.map((contact, index) => (
            <option key={index} value={contact}>
              {contact}
            </option>
          ))}
        </select>
      </div>

      {/* Message Input */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-2 border rounded resize-none"
          rows={3}
        />
      </div>

      {/* Send Message Button */}
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
      >
        Send Message
      </button>

      {/* Message History */}
      <div className="mt-6">
        <h3 className="text-gray-600 text-lg">Message History</h3>
        <ul className="mt-2 max-h-48 overflow-y-auto">
          {messageHistory.map((msg, index) => (
            <li key={index} className="mb-2 p-2 bg-gray-200 rounded">
              <strong>{msg.contact}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;

import React, { useState } from 'react';

const Modal = ({ isOpen, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="email" onChange={handleChange} placeholder="Email" required />
        <input name="phone" onChange={handleChange} placeholder="Phone" required />
        <input name="address" onChange={handleChange} placeholder="Address" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Modal;
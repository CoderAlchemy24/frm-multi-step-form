import './FormStep1.css';
import { useState } from 'react';

export default function FormStep1({ data, updateFormData, forward }) {
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const validateField = (field, value) => {
    const trimmedValue = value.trim();

    if (field === 'name') {
      return trimmedValue.length > 1;
    }

    if (field === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
    }

    if (field === 'phone') {
      const digitsOnly = trimmedValue.replace(/\D/g, '');
      return /^[+()\-\s\d]+$/.test(trimmedValue) && digitsOnly.length >= 7;
    }

    return true;
  };

  const setFieldValue = (field, value) => {
    updateFormData({ [field]: value });

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: !validateField(field, value),
      }));
    }
  };

  const validateSingleField = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: !validateField(field, data[field]),
    }));
  };

  const handleNextStep = () => {
    const nextErrors = {
      name: !validateField('name', data.name),
      email: !validateField('email', data.email),
      phone: !validateField('phone', data.phone),
    };

    setErrors(nextErrors);

    if (!Object.values(nextErrors).some(Boolean)) {
      forward();
    }
  };

  const getErrorMessage = (field) => {
    if (field === 'name') {
      return data.name.trim() ? 'Invalid name' : 'This field is required';
    }

    if (field === 'email') {
      return data.email.trim() ? 'Invalid email address' : 'This field is required';
    }

    if (field === 'phone') {
      return data.phone.trim() ? 'Invalid phone number' : 'This field is required';
    }

    return 'This field is required';
  };

    return (
        <div className="form-step-1">
            <h1 className="title">Personal info</h1>
            <p className="description">Please provide your name, email address and phone number.</p>
            <form action="" className="form">
                <div className='labels'>
                  <label htmlFor="name" className='label'>Name</label>
                  <span  className={`error-label ${errors.name ? 'active' : ''}`}>{getErrorMessage('name')}</span>
                </div>
                <input
                  type="text"
                  id='name'
                  placeholder='e.g. Stephen King'
          className={`input ${errors.name ? 'active' : ''}`}
                  value={data.name}
          onChange={(e) => setFieldValue('name', e.target.value)}
          onBlur={() => validateSingleField('name')}
                />
                <div className='labels'>
                  <label htmlFor="email" className='label'>Email Address</label>
                  <span className={`error-label ${errors.email ? 'active' : ''}`}>
                     {getErrorMessage('email')}
                  </span >
                </div>
                <input
                  type="email"
                  id='email'
                  placeholder='e.g. stephenking@lorem.com'
          className={`input ${errors.email ? 'active' : ''}`}
                  value={data.email}
          onChange={(e) => setFieldValue('email', e.target.value)}
          onBlur={() => validateSingleField('email')}
                /> 
                <div className='labels'>
                  <label htmlFor="phone" className='label'>Phone Number</label>
                  <span className={`error-label ${errors.phone ? 'active' : ''}`}>
                    {getErrorMessage('phone')}
                  </span>
                </div>
                <input
                  type="tel"
                  id='phone'
                  placeholder='e.g. +1 234 567 890'
                    className={`input ${errors.phone ? 'active' : ''}`}
                  value={data.phone}
                  onChange={(e) => setFieldValue('phone', e.target.value)}
                  onBlur={() => validateSingleField('phone')}
                />  
                </form>
                <div className="btns">
                    <button type='button' className='btn-next' onClick={handleNextStep}>Next Step</button>
                </div>
            
        </div>
    );
}
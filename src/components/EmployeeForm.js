
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUpload from './FileUpload';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = ({ onSuccess, initialData, onCancelEdit }) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
   //const API_URL = 'http://localhost:5000/employees';
  const API_URL = `${process.env.REACT_APP_API_URL}/employees`;

  // ✅ Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(2, 'Too short'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.string()
      .matches(/^\d{9,13}$/, 'Must be 9-13 digits')
      .required('Contact is required'),
    position: Yup.string().required('Position is required'),
    photo: Yup.mixed().test(
      'fileSize',
      'File size must be less than 2MB',
      (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    ),
  });

  const formik = useFormik({
    enableReinitialize: true, // ✅ Allows values to update when `initialData` changes
    initialValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      contact: initialData?.contact || '',
      position: initialData?.position || '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('contact', values.contact);
      formData.append('position', values.position);
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      try {
        if (initialData) {
          // ✅ UPDATE Employee
          await axios.put(`${API_URL}/${initialData._id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else {
          // ✅ ADD Employee
          await axios.post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }

        resetForm();
        setPhotoFile(null);
        setPhotoPreview(null);
        onSuccess(); // ✅ Refresh employees list
        onCancelEdit(); // ✅ Clear editing mode
      } catch (error) {
        toast.error(error?.response?.data?.error);
        console.error('Error submitting form:', error);
      }
    },
  });

  useEffect(() => {
    if (initialData?.photo) {
      setPhotoPreview(`http://localhost:5000${initialData.photo}`);
    }
  }, [initialData]);

  return (
    <div className="employee-form">
      <h2>{initialData ? 'Edit Employee' : 'Add New Employee'}</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

        {/* Contact Input */}
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          {...formik.getFieldProps('contact')}
        />
        {formik.touched.contact && formik.errors.contact && (
          <div className="error">{formik.errors.contact}</div>
        )}

        {/* Position Input */}
        <input
          type="text"
          name="position"
          placeholder="Position"
          {...formik.getFieldProps('position')}
        />
        {formik.touched.position && formik.errors.position && (
          <div className="error">{formik.errors.position}</div>
        )}

        {/* File Upload Component */}
        <FileUpload onFileChange={setPhotoFile} preview={photoPreview} />
        {formik.errors.photo && <div className="error">{formik.errors.photo}</div>}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update' : 'Add'} Employee
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeForm;


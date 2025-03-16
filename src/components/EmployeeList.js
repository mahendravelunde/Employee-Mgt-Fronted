import React from 'react';
import axios from 'axios';
import EmployeeItem from './EmployeeItem';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
   const API_URL = 'http://localhost:5000/employees';
  //const API_URL = `${process.env.REACT_APP_API_URL}/employees`;

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      onDelete(); // ✅ Refresh list after delete
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list">
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        employees.map((employee) => (
          <EmployeeItem key={employee._id} employee={employee} onEdit={onEdit} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default EmployeeList;

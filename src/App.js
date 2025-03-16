import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './styles/App.css';
import axios from 'axios';

const App = () => {
  const { theme } = useTheme();
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const API_URL = 'http://localhost:5000/employees';
  //const API_URL = `${process.env.REACT_APP_API_URL}/employees`;

  

  // ✅ Fetch employees from API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // ✅ Load employees on initial render
  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Start editing an employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  // ✅ Cancel editing
  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <main className="container">
        <div className="form-container">
          <EmployeeForm 
            onSuccess={fetchEmployees} 
            initialData={editingEmployee} 
            onCancelEdit={handleCancelEdit}
          />
          {editingEmployee && (
            <button onClick={handleCancelEdit} className="btn btn-secondary">
              Cancel Edit
            </button>
          )}
        </div>
        <div className="list-container">
          <h2>Employee List</h2>
          <EmployeeList
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={fetchEmployees}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

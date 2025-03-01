import React from 'react';

const EmployeeItem = ({ employee, onEdit, onDelete }) => {
  const { _id, name, email, contact, position, photo } = employee;

  return (
    <div className="employee-item">
      <div className="employee-photo">
        {/* {photo ? <img src={photo} alt={name} /> : <div className="no-photo">No Photo</div>} */}
        {photo ? <img
          src={`http://localhost:5000${employee.photo}`}
          alt={employee.name}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          onError={(e) => e.target.src = "https://via.placeholder.com/100"}
        /> : <div className="no-photo">No Photo</div>}

      </div>
      <div className="employee-info">
        <h3>{name}</h3>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Position:</strong> {position}</p>
      </div>
      <div className="employee-actions">
        <button onClick={() => onEdit(employee)} className="btn btn-edit">Edit</button>
        <button onClick={() => onDelete(_id)} className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default EmployeeItem;

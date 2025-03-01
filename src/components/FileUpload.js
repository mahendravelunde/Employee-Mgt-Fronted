import React, { useState } from 'react';

const FileUpload = ({ onFileChange, preview }) => {
  const [error, setError] = useState('');

  const validateFile = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      return 'Only JPEG and PNG files are allowed';
    }

    // Check file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      return 'File size should not exceed 2MB';
    }

    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    onFileChange(file);
  };

  return (
    <div className="file-upload">
      <label htmlFor="photo">Photo:</label>
      <input
        type="file"
        id="photo"
        name="photo"
        accept=".jpeg,.jpg,.png"
        onChange={handleFileChange}
      />
      {error && <p className="error">{error}</p>}
      {preview && (
        <div className="preview">
          <img src={preview} alt="Preview" width="100" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
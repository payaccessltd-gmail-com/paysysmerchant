import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload'); 
    
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dc2zavmxp/upload`, 
        formData
      );
      setUploadedUrl(response.data.secure_url);
     
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
     {
      uploadedUrl && <p>{uploadedUrl}</p>
     }
    </div>
  );
};

export default FileUpload;

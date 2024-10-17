import { useState } from 'react';
import axios from 'axios';

interface CloudinaryResponse {
  secure_url: string;
  [key: string]: any;
}

interface UseCloudinaryUploadReturn {
  uploadFile: (file: File) => Promise<CloudinaryResponse | undefined>;
  isLoading: boolean;
  error: string | null;
}

const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<CloudinaryResponse | undefined> => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dc2zavmxp/upload`,
        formData
      );

      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError('File upload failed');
      setIsLoading(false);
      console.error('Error uploading file:', err);
      return undefined;
    }
  };

  return { uploadFile, isLoading, error };
};

export default useCloudinaryUpload;




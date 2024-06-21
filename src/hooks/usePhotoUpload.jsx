import { message } from "antd";
import axios from "axios";
import { useState } from "react";

const usePhotoUpload = () => {
    const [photo,setPhoto] = useState(null)
    const uploadProps = {
        name: 'file',
        multiple: false,
        accept: 'image/*',
        customRequest: async ({ file, onSuccess, onError }) => {
          const formData = new FormData();
          formData.append('image', file);
    
          try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, formData);
            onSuccess(response.data)
    
            message.success(`${file.name} File uploaded successfully.`);
            setPhoto(response.data.data.url);
          } catch (error) {
            onError(error);
            message.error(`${file.name} File upload failed.`);
          }
        },
      };
      return {photo,uploadProps,setPhoto}
}

export default usePhotoUpload
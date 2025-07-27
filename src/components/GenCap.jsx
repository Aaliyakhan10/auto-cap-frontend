import React, { useRef, useState } from 'react'
import { supabase } from '../supabaseClient';
import axios from 'axios';
import { toast } from 'react-toastify';
const GenCap = () => {
    const captions=JSON.parse(localStorage.getItem('cap'));
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(localStorage.getItem('url')?localStorage.getItem('url'):null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cap, setCap] = useState(localStorage.getItem('cap')?JSON.parse(localStorage.getItem('cap')):{

     shortCaption:" ",
    longCaption:" "
  })
  
  const generateCaption = async (url) => {
  try {
    setIsLoading(true);
    const response = await axios.post(
      `${process.env.BACKEND_URL}/caption-generator`,
      { imgUrl: url },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log(response);
    localStorage.setItem('cap', JSON.stringify(response.data));
    setCap(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

  const handleImageChange = async(e) => {
    localStorage.setItem('url'," ");

    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // show preview
    }
    setUploading(true);

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from('images') // your bucket name
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error.message);
    } else {
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      setImageUrl(publicUrlData.publicUrl);
     localStorage.setItem('url',publicUrlData.publicUrl);

      generateCaption(publicUrlData.publicUrl);

    }

    setUploading(false);
  };
  
    const handleButtonClick = () => {
    fileInputRef.current.click(); // trigger the file input
  };
  return (
    <div className="flex flex-col items-center gap-4 mt-7 w-[70%] mx-auto">
        <p className='text-center text-secondary font-medium'>Upload your image to generate a unique, creative caption instantly. Whether it's for social media, storytelling, or just for fun — let AutoCap turn your photos into share-worthy moments with the power of AI.</p>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Custom upload button */}
      <button
        onClick={handleButtonClick}
        className="btn bg-primary text-white px-6 py-2 rounded shadow hover:bg-primary-dark transition"
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>

      <div className='flex flex-col justify-center items-center w-[80%] mb-9 p-4'>

       {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-64 h-64 object-cover rounded shadow-md"
        />
      )}
        {cap.shortCaption && (
  <div className="text-center mt-4">
    <h2 className="text-xl font-bold mb-2">Short Caption</h2>
    <p className="text-secondary mb-4">{cap.shortCaption}</p>

    <h2 className="text-xl font-bold mb-2">Long Caption</h2>
    <p className="text-secondary">{cap.longCaption}</p>
  </div>
)}
<button
  onClick={() => {navigator.clipboard.writeText(cap.shortCaption);
    toast.success("Copied to your clipboard");
  } }
  className="btn m-4"
>
  Copy
</button>
    

    </div>
      </div>
  )
}

export default GenCap
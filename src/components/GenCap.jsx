import React, { useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './Loading';

const GenCap = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('url') ? localStorage.getItem('url') : null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let initialCap = { shortCaption: " ", longCaption: " " };
try {
  const stored = localStorage.getItem('cap');
  if (stored) initialCap = JSON.parse(stored);
} catch (e) {
  console.error("Invalid JSON in localStorage for 'cap':", e);
  localStorage.removeItem('cap');
}

const [cap, setCap] = useState(initialCap);

  const generateCaption = async (url) => {
    try {
      const response = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/caption-generator`,
        { imgUrl: url },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response);
      localStorage.setItem('cap', JSON.stringify(response.data));
      setCap(response.data);
      toast.success("Caption Generated Successfully");
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast.error("Failed to generate a caption");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    setIsLoading(true);
    localStorage.setItem('url', " ");

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
      toast.success("Failed to upload image");
      setIsLoading(false);
    } else {
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      setImageUrl(publicUrlData.publicUrl);
      toast.success("Image Uploaded Successfully");
      localStorage.setItem('url', publicUrlData.publicUrl);

      generateCaption(publicUrlData.publicUrl);
    }

    setUploading(false);
  };

  const handleButtonClick = () => {
    // Clear previous image and captions
    localStorage.removeItem('cap');
    localStorage.removeItem('url');

    setCap({ shortCaption: " ", longCaption: " " });
    setImageUrl(null);
    setSelectedImage(null);

    fileInputRef.current.click(); // trigger the file input
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className="flex flex-col items-center gap-4 mt-7 w-[70%] mx-auto">
        <p className='text-center text-secondary font-medium'>
          Upload your image to generate a unique, creative caption instantly. Whether it's for social media, storytelling, or just for fun — let AutoCap turn your photos into share-worthy moments with the power of AI.
        </p>

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

        <div className='flex flex-col justify-center items-center w-full min-md:w-[80%] mb-9 p-4'>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-64 h-64 object-cover rounded shadow-md"
            />
          )}

         {cap.shortCaption && cap.shortCaption.trim().length > 0 && (
  <div className='flex flex-col justify-center items-center'>
    <div className="text-center mt-4">
      <h2 className="text-xl font-bold mb-2">Short Caption</h2>
      <p className="text-secondary mb-4">{cap.shortCaption}</p>

      <h2 className="text-xl font-bold mb-2">Long Caption</h2>
      <p className="text-secondary">{cap.longCaption}</p>
    </div>

    <button
      onClick={() => {
        navigator.clipboard.writeText(cap.shortCaption);
        toast.success("Copied to your clipboard");
      }}
      className="btn m-4"
    >
      Copy
    </button>
  </div>
)}


        </div>
      </div>
    </>
  );
};

export default GenCap;

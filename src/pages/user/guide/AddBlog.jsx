import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  BiImageAdd,
  BiSolidCalendar,
  BiSolidMap,
  BiSolidSave,
  BiSolidUser,
} from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [value, setValue] = useState("hello world");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload image file png/jpg");
      setImagePreview(null); // Reset preview jika file tidak valid
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    multiple: false,
  });

  const quillRef = useRef(null);

  const handleQuillRef = useCallback((ref) => {
    if (ref) {
      const quill = ref.getEditor();
      if (quill) {
        quill.root.setAttribute("spellcheck", false);
        quillRef.current = ref;
      }
    }
  }, []);

  return (
    <div className="container flex flex-col items-center min-h-screen px-20 py-10">
      {/* Title Section */}
      <input
        className="w-full p-4 mb-6 text-5xl font-bold border-4 border-black border-dashed rounded outline-none text-secondary placeholder:text-paragraph"
        placeholder="Click To Add Your Title Blog"
      />

      {/* Image Upload Section */}
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center w-full mb-1 text-center border-4 border-dashed rounded cursor-pointer h-[500px] border-paragraph"
      >
        <input {...getInputProps()} />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="object-cover object-center w-full h-full"
          />
        ) : (
          <>
            <BiImageAdd className="mx-auto mb-4 text-[200px] text-tertiary" />
            <p className="text-lg text-tertiary">
              <strong>Choose a file</strong> or drag image here
            </p>
          </>
        )}
      </div>

      {/* Metadata Section */}
      <div className="flex w-full mb-6 space-x-6 text-xl text-tertiary">
        <div className="flex items-center space-x-2">
          <BiSolidUser />
          <span>Username</span>
        </div>
        <div className="flex items-center space-x-2">
          <BiSolidMap />
          <span>City, Country</span>
        </div>
        <div className="flex items-center space-x-2">
          <BiSolidCalendar />
          <span>DD/MM/YYYY</span>
        </div>
      </div>

      {/* Rich Text Editor Section */}
      <ReactQuill
        className="w-full"
        theme="snow"
        ref={handleQuillRef}
        value={value}
        onChange={setValue}
      />

      {/* Floating Save Button */}
      <button className="fixed p-4 text-white rounded-full bg-primary bottom-10 right-10">
        <BiSolidSave className="text-4xl" />
      </button>
    </div>
  );
};

export default AddBlog;

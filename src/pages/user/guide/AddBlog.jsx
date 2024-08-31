import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import setFirestoreStorage from "../../../utils/setFirestoreStorage"; // Import utilitas Firebase Storage
import { db } from "../../../utils/firebase"; // Import Firebase configuration
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
import { useAuth } from "../../../hooks/useAuth"; // Import custom hook for auth context
import { ToastContainer, toast } from "react-toastify"; // Import Toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

const AddBlog = () => {
  const { slug } = useParams(); // Get slug from URL
  const navigate = useNavigate(); // Hook for navigation
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null); // Store the selected file
  const [value, setValue] = useState("");
  const [blogData, setBlogData] = useState(null); // State to store fetched blog data
  const { userData } = useAuth(); // Get user data

  // Function to fetch blog data by slug
  const fetchBlogData = async () => {
    if (!slug) return; // Check if slug is available

    try {
      const q = query(collection(db, "Blogs"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0]; // Get the first document matching the slug
        const docSnap = await getDoc(doc(db, "Blogs", docRef.id));

        if (docSnap.exists()) {
          setBlogData({ id: docRef.id, ...docSnap.data() }); // Include document ID
          setValue(docSnap.data().article); // Set article content
          setImagePreview(docSnap.data().image || null); // Set image preview
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No document with the specified slug found!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  useEffect(() => {
    fetchBlogData(); // Fetch data when component mounts or slug changes
  }, [slug]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      if (file.size > 1 * 1024 * 1024) {
        // Validate file size is less than 1MB
        alert("File size should be less than 1MB");
        return;
      }

      setFile(file); // Store the selected file
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file (png/jpg)");
      setImagePreview(null); // Reset preview if the file is not valid
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

  // Function to handle saving data (draft or publish)
  const handleSave = async (status) => {
    if (!blogData || !blogData.id) return; // Check if blogData and ID are available

    let imageUrl = blogData.image; // Use existing image if no new image is uploaded

    if (file) {
      try {
        // Mengunggah gambar baru dan hapus gambar lama (jika ada)
        imageUrl = await setFirestoreStorage(
          file,
          blogData.id,
          "blog-images",
          blogData.imageName
        );
      } catch (error) {
        toast.error("Failed to upload image.");
        return;
      }
    }

    const updatedData = {
      ...blogData,
      article: value,
      status,
      image: imageUrl || "", // Update with the new image or keep existing
    };

    try {
      const docRef = doc(db, "Blogs", blogData.id); // Reference to the document by ID
      await updateDoc(docRef, updatedData); // Update document in Firestore

      toast.success(
        `Blog successfully ${
          status === "draft" ? "saved as draft" : "published"
        }!`
      );
      setTimeout(() => {
        navigate("/draft"); // Redirect to draft after saving
      }, 3000); // Delay to allow toast to show
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("An error occurred while saving the blog.");
    }
  };

  return (
    <div className="container flex flex-col items-center min-h-screen px-20">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container flex items-center justify-center w-1/2 mt-4 mb-20">
        {/* Step Progress Bar */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-xl font-bold text-center text-white rounded-full w-14 h-14 bg-primary">
            1
          </div>
          <div className="absolute mt-24 font-medium text-center text-primary">
            Essential information
          </div>
        </div>

        <div className="flex-auto border-t-4 border-primary"></div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-xl font-bold text-center text-white rounded-full w-14 h-14 bg-primary">
            2
          </div>
          <div className="absolute mt-20 font-medium text-center whitespace-nowrap text-primary">
            Write blog
          </div>
        </div>

        <div className="flex-auto border-t-4 border-tertiary"></div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-xl font-bold text-center text-white rounded-full w-14 h-14 bg-tertiary">
            3
          </div>
          <div className="absolute mt-20 font-medium text-center whitespace-nowrap text-tertiary">
            Publish
          </div>
        </div>
      </div>

      <form className="w-full">
        {/* title */}
        <input
          className="w-full p-4 mb-6 text-5xl font-bold border-4 border-black border-dashed rounded outline-none text-secondary placeholder:text-paragraph"
          placeholder="Click To Add Your Title Blog"
          value={blogData?.title || ""}
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
        />

        {/* Image */}
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
            <span>{userData?.username || "Username"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BiSolidMap />
            <span>
              {blogData
                ? `${blogData.city}, ${blogData.country}`
                : "City, Country"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <BiSolidCalendar />
            <span>{blogData ? blogData.tanggal : "DD/MM/YYYY"}</span>
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
      </form>

      {/* Button save & publish */}
      <div className="flex items-center justify-between w-full my-10">
        {/* Save to draft */}
        <button
          type="button"
          className="left-0 px-6 py-3 font-semibold border-2 rounded-lg text-primary border-primary hover:bg-primary-dark"
          onClick={() => handleSave("draft")}
        >
          Save to draft
        </button>

        {/* Publish */}
        <button
          type="button"
          className="left-0 px-6 py-3 font-semibold text-white border-2 rounded-lg border-primary bg-primary hover:bg-primary-dark"
          onClick={() => handleSave("published")}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddBlog;

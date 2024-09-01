import React, { useEffect, useState } from "react";
import SidebarGuide from "../../../components/SidebarGuide";
import {
  BiFileBlank,
  BiGlobe,
  BiPlus,
  BiSearch,
  BiSolidImage,
  BiTrash,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../../utils/firebase"; // Import Firebase configuration
import { useAuth } from "../../../hooks/useAuth"; // Import custom hook for auth context
import { ToastContainer, toast } from "react-toastify"; // Import Toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

const Draft = () => {
  const [blogs, setBlogs] = useState([]); // State to store fetched blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]); // State to store filtered blogs
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const { userData } = useAuth(); // Get userData from custom hook

  // Function to fetch blogs from Firestore
  const fetchBlogs = async (search = "") => {
    if (!userData) return; // Check if userData is available

    const q = query(
      collection(db, "Blogs"),
      where("idUser", "==", userData.id)
    );

    const querySnapshot = await getDocs(q);
    const blogsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter blogs based on search term
    const filtered = blogsData.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );

    setBlogs(blogsData);
    setFilteredBlogs(filtered);
  };

  // Function to delete a blog
  const handleDelete = async (id, imageName) => {
    // Show confirmation popup
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return; // If not confirmed, do nothing

    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, "Blogs", id));

      // If there's an associated image, delete it from Firebase Storage
      if (imageName) {
        const imageRef = ref(storage, `blog-images/${imageName}`);
        await deleteObject(imageRef);
      }

      // Update the local state after deletion
      setFilteredBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== id)
      );
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));

      toast.success("Blog deleted successfully."); // Show success toast
    } catch (error) {
      console.error("Error deleting blog: ", error);
      toast.error("Failed to delete the blog."); // Show error toast
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs(); // Fetch all blogs initially
  }, [userData]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    fetchBlogs(search); // Perform search
  };

  // Function to handle search button click
  const handleSearchClick = () => {
    fetchBlogs(searchTerm); // Perform search on button click
  };

  return (
    <div>
      <SidebarGuide />
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
      <div className="min-h-screen p-5 ml-20 bg-gray-200">
        <div className="container flex items-center justify-between px-7">
          <h1 className="text-4xl font-semibold">Draft</h1>

          <div className="flex items-stretch">
            <input
              type="text"
              className="p-3 outline-none w-96 placeholder:text-tertiary"
              placeholder="Search draft"
              value={searchTerm}
              onChange={handleSearchChange} // Trigger search on input change
            />
            <button
              className="px-6 text-white bg-secondary"
              onClick={handleSearchClick} // Trigger search on button click
            >
              <BiSearch className="text-2xl" />
            </button>
          </div>

          <Link
            className="flex items-center p-2 px-3 text-xl font-semibold text-white rounded-md cursor-pointer hover:opacity-60 gap-x-3 bg-primary"
            to={`/onb`}
          >
            <BiPlus className="text-2xl" />
            <p>Create Blog</p>
          </Link>
        </div>

        <div className="container flex flex-wrap items-center px-7 mt-9 gap-x-9">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="relative mb-1 h-60 w-96">
                {/* Show image if exists, else show default */}
                {blog.image ? (
                  // Use dynamic path with slug
                  <Link to={`/edit/${blog.slug}`}>
                    <img
                      src={blog.image}
                      alt="Blog"
                      className="object-cover object-center w-full h-full mb-2 rounded-lg hover:opacity-80"
                    />
                  </Link>
                ) : (
                  // Use dynamic path with slug
                  <Link to={`/edit/${blog.slug}`}>
                    <div className="flex items-center justify-center w-full h-full mb-2 text-gray-700 bg-gray-500 rounded-lg">
                      <BiSolidImage className="text-6xl" />
                    </div>
                  </Link>
                )}

                {/* Status overlay */}
                <div className="absolute z-10 flex items-center justify-center gap-2 p-2 font-semibold text-white bg-black bg-opacity-75 rounded-md bottom-2 left-2 shadow-cust">
                  {blog.status === "published" ? (
                    <BiGlobe className="text-2xl" />
                  ) : (
                    <BiFileBlank className="text-2xl" />
                  )}
                  <span>
                    {blog.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                {/* Delete button */}
                <div
                  onClick={() => handleDelete(blog.id, blog.imageName)}
                  className="absolute z-30 flex items-center justify-center gap-2 p-2 font-semibold text-white bg-red-600 bg-opacity-75 rounded-md cursor-pointer top-2 right-2 shadow-cust"
                >
                  <BiTrash />
                  <span>Delete</span>
                </div>

                {/* Use dynamic path */}
                <Link
                  to={`/edit/${blog.slug}`}
                  className="text-2xl font-semibold"
                >
                  {blog.title}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-paragraph">Blog not found</p> // Display message when no results found
          )}
        </div>
      </div>
    </div>
  );
};

export default Draft;

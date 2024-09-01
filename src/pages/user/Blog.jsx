import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate for slug and navigation
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  BiArrowBack,
  BiSolidCalendar,
  BiSolidMap,
  BiSolidUser,
} from "react-icons/bi"; // Import back icon
import { db } from "../../utils/firebase"; // Import Firebase configuration

const Blog = () => {
  const { slug } = useParams(); // Get slug from URL
  const navigate = useNavigate(); // Hook for navigation
  const [blogData, setBlogData] = useState(null); // State to store fetched blog data

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

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container p-6 mx-auto">
      {/* Back button */}
      <button onClick={handleBack} className="flex items-center mb-4">
        <BiArrowBack className="mr-2 text-2xl" />
        Back
      </button>

      {blogData ? (
        <div>
          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold">{blogData.title}</h1>

          {/* Image */}
          {blogData.image && (
            <img
              src={blogData.image}
              alt="Blog"
              className="w-full h-auto mb-6 rounded-lg"
            />
          )}

          {/* Author and Date */}
          <div className="flex items-center mb-6 space-x-4 text-lg">
            <div className="flex items-center space-x-2">
              <BiSolidUser />
              <span>{blogData.author || "Unknown Author"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BiSolidCalendar />
              <span>{blogData.tanggal || "DD/MM/YYYY"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BiSolidMap />
              <span>{`${blogData.city}, ${blogData.country}`}</span>
            </div>
          </div>

          {/* Content */}
          <div
            className="mb-6 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blogData.article }}
          />

          {/* Google Maps Link */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Blog;

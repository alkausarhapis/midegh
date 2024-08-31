import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase"; // Import Firebase configuration
import { useAuth } from "../hooks/useAuth"; // Import custom hook for auth context
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

const OnboardingForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [gmap, setGmap] = useState("");
  const [inputError, setInputError] = useState({}); // State to track input errors
  const navigate = useNavigate(); // Hook for navigation

  const { userData } = useAuth(); // Get userData from custom hook

  // Function to format the date to dd-mm-yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Handle slug change and format it
  const handleSlugChange = (e) => {
    setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
  };

  // Function to check if the slug is unique
  const checkSlugUnique = async (slug) => {
    const q = query(collection(db, "Blogs"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // Returns true if no documents with the same slug are found
  };

  // Function to handle form submission
  const handleSubmit = async (e, redirectPath) => {
    e.preventDefault(); // Prevent default form submission

    // Check for empty fields
    const errors = {};
    if (!title) errors.title = true;
    if (!slug) errors.slug = true;
    if (!country) errors.country = true;
    if (!city) errors.city = true;
    if (!gmap) errors.gmap = true;

    // If there are any empty fields, show toast error and highlight fields
    if (Object.keys(errors).length > 0) {
      setInputError(errors); // Update state to reflect input errors
      toast.error("Please fill in all required fields.");
      return;
    }

    // Check if slug is unique
    const isUnique = await checkSlugUnique(slug);
    if (!isUnique) {
      toast.error(
        "The custom URL is already in use. Please choose another one."
      );
      return;
    }

    try {
      // Save data to Firestore in the 'Blogs' collection
      await addDoc(collection(db, "Blogs"), {
        title,
        slug,
        country,
        city,
        gmapLink: gmap,
        article: "",
        tanggal: formatDate(new Date()),
        idUser: userData.id,
      });
      toast.success("Data successfully saved as draft!");

      // Redirect to the appropriate page after success
      setTimeout(() => {
        navigate(redirectPath);
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("An error occurred while saving the data.");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
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
      <section className="container w-1/2 mt-10">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-bold text-secondary"
              htmlFor="blogTitle"
            >
              Blog Title<span className="text-red-600">*</span>
            </label>
            <input
              className={`relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary ${
                inputError.title ? "border-red-400" : ""
              }`}
              id="blogTitle"
              type="text"
              placeholder="The beauty of bla bla"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setInputError({ ...inputError, title: false }); // Clear error on change
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-bold text-secondary"
              htmlFor="blogSlug"
            >
              Custom URL<span className="text-red-600">*</span>
            </label>
            <input
              className={`relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary ${
                inputError.slug ? "border-red-400" : ""
              }`}
              id="blogSlug"
              type="text"
              value={slug}
              onChange={(e) => {
                handleSlugChange(e);
                setInputError({ ...inputError, slug: false }); // Clear error on change
              }}
              placeholder="the-beauty-blabla"
              required
            />
          </div>

          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label
                className="block mb-2 text-lg font-bold text-secondary"
                htmlFor="country"
              >
                Country<span className="text-red-600">*</span>
              </label>
              <input
                className={`relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary ${
                  inputError.country ? "border-red-400" : ""
                }`}
                id="country"
                type="text"
                placeholder="France"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setInputError({ ...inputError, country: false }); // Clear error on change
                }}
                required
              />
            </div>
            <div className="w-1/2">
              <label
                className="block mb-2 text-lg font-bold text-secondary"
                htmlFor="city"
              >
                City<span className="text-red-600">*</span>
              </label>
              <input
                className={`relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary ${
                  inputError.city ? "border-red-400" : ""
                }`}
                id="city"
                type="text"
                placeholder="Paris"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setInputError({ ...inputError, city: false }); // Clear error on change
                }}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-bold text-secondary"
              htmlFor="mapsLink"
            >
              Google Maps Link<span className="text-red-600">*</span>
            </label>
            <input
              className={`relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary ${
                inputError.gmap ? "border-red-400" : ""
              }`}
              id="mapsLink"
              type="text"
              placeholder="https://maps.app.goo.gl/placeid"
              value={gmap}
              onChange={(e) => {
                setGmap(e.target.value);
                setInputError({ ...inputError, gmap: false }); // Clear error on change
              }}
              required
            />
          </div>

          <div className="flex items-center justify-between w-full">
            {/* Save to draft */}
            <button
              type="button"
              className="left-0 px-6 py-3 font-semibold border-2 rounded-lg text-primary border-primary hover:bg-primary-dark"
              onClick={(e) => handleSubmit(e, "/draft")}
            >
              Save to draft
            </button>

            {/* Next */}
            <button
              type="button"
              className="left-0 px-6 py-3 font-semibold text-white border-2 rounded-lg border-primary bg-primary hover:bg-primary-dark"
              onClick={(e) => handleSubmit(e, "/addblog")}
            >
              Next
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default OnboardingForm;

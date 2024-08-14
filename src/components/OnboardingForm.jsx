import { useState } from "react";
import { Link } from "react-router-dom";

const OnboardingForm = () => {
  const [slug, setSlug] = useState("");

  const handleSlugChange = (e) => {
    setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <section className="container w-1/2 mt-10">
        <form>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-bold text-secondary"
              htmlFor="blogTitle"
            >
              Blog Title<span className="text-red-600">*</span>
            </label>
            <input
              className="relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary"
              id="blogTitle"
              type="text"
              placeholder="The beauty of bla bla"
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
              className="relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary"
              id="blogSlug"
              type="text"
              value={slug}
              onChange={handleSlugChange}
              placeholder="the-beauty-blabla"
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
                className="relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary"
                id="country"
                type="text"
                placeholder="France"
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
                className="relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary"
                id="city"
                type="text"
                placeholder="Paris"
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
              className="relative w-full px-3 py-2 mb-4 border rounded text-tertiary border-paragraph focus-within:text-secondary focus-within:border-secondary"
              id="mapsLink"
              type="text"
              placeholder="https://maps.app.goo.gl/placeid"
            />
          </div>

          <div className="flex justify-end w-full">
            <Link
              to={`/addblog`}
              className="left-0 px-6 py-3 font-semibold text-white rounded-lg bg-primary hover:bg-primary-dark"
            >
              Next
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default OnboardingForm;

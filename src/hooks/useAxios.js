import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  },
});

export const searchPhotos = (query, perPage = 1) => {
  return unsplashApi.get("/search/photos", {
    params: {
      query: query,
      per_page: perPage,
    },
  });
};

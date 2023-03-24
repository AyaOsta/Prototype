import wretch from "wretch";

// export const BASE_URL = "http://localhost:8000/";
export const BASE_URL = "https://ml-lau-backend.onrender.com/";

export const client = wretch(BASE_URL);

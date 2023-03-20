import wretch from "wretch";

export const BASE_URL = "http://localhost:8000/";

export const client = wretch(BASE_URL);

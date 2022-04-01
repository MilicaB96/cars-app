import axios from "axios";

export default class HttpService {
  constructor() {
    const instance = axios.create({
      baseURL: "http://localhost:8000/api",
    });

    this.client = instance;
    this.client.interceptors.request.use((request) => {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    });
  }
}

import axios from "axios";

export default class HttpService {
  constructor() {
    const instance = axios.create({
      baseURL: "http://localhost:8000/api",
    });

    this.client = instance;
  }
}

import axios from "axios";

class CarService {
  constructor() {
    const instance = axios.create({
      baseURL: "http://localhost:5500",
    });

    this.client = instance;
  }

  async getAll() {
    try {
      const { data } = await this.client.get("api/cars");
      return data;
    } catch (error) {
      console.log("Greska", error);
    }

    return [];
  }
}

export default new CarService();

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
  async create(car) {
    try {
      const { data } = await this.client.post("api/cars", car);
    } catch (error) {
      console.log("Greska", error);
    }
    return [];
  }
  async get(id) {
    try {
      const { data } = await this.client.get(`api/cars/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
  async edit(id, car) {
    try {
      const { data } = await this.client.put(`api/cars/${id}`, car);
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id) {
    try {
      const { data } = await this.client.delete(`api/cars/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CarService();

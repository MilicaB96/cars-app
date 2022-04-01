import axios from "axios";
class CarService {
  constructor() {
    const instance = axios.create({
      baseURL: "http://localhost:8000",
    });

    this.client = instance;
  }

  async getAll() {
    try {
      const { data } = await this.client.get("api/cars");
      console.log(data);
      return data;
    } catch (error) {
      console.log("Greska", error);
    }

    return [];
  }
  async create(car) {
    try {
      const { data } = await this.client.post("api/cars", car);
      console.log(data);
      return data;
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
      return data;
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

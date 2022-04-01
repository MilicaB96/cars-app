import axios from "axios";
class CarService {
  constructor() {
    const instance = axios.create({
      baseURL: "http://localhost:8000/api",
    });

    this.client = instance;
  }

  async getAll() {
    try {
      const { data } = await this.client.get("cars");
      return data;
    } catch (error) {
      console.log("Greska", error);
    }

    return [];
  }
  async create(car) {
    const { data } = await this.client.post("cars", car);
    return data;
    //   const errors = [];
    //   for (const attr in error.response.data.errors) {
    //     error.response.data.errors[attr]
    //   }
  }
  async get(id) {
    try {
      const { data } = await this.client.get(`cars/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
  async edit(id, car) {
    try {
      const { data } = await this.client.put(`cars/${id}`, car);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id) {
    try {
      const { data } = await this.client.delete(`cars/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CarService();

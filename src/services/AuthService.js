import axios from "axios";
import HttpService from "./HttpService";
class AuthService extends HttpService {
  async login(credentials) {
    const { data } = await this.client.post("/login", credentials);
    localStorage.setItem("token", data.token);
  }
  async logout() {
    const { data } = await this.client.post("/logout");
    console.log(data);
    localStorage.removeItem("token");
  }
  async register(user) {
    const { data } = await this.client.post("/register", user);
    // localStorage.setItem("token", data.token);
  }
}
export default new AuthService();

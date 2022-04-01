import axios from "axios";
import HttpService from "./HttpService";
class AuthService extends HttpService {
  async login(credentials) {
    const { data } = await this.client.post("login", credentials);
    console.log(data);
    localStorage.setItem("token", data.token);
  }
}
export default new AuthService();

import axios from "axios";
export default {
  async registration(data) {
    return await axios.post('/api/user_registration/signup',data)
  },
  async getLogin(data) {
    return await axios.post('/api/user_registration/signin',data)
  },

}
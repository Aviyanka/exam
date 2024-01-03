import axios from "axios";
export default {
  async fetchAllVendorType() {
    return await axios.get('/api/vendor/type/')
  },
}
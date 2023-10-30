import axios from "axios";
const callApi = async (method, url, data) => {


    try {
      const response = await axios({
        method,
        url,
        data,
      });

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw new Error("API Error");
    }
  };

  export default callApi
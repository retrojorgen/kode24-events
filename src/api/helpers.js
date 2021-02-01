import axios from "axios";
axios.defaults.withCredentials = true;
const apiUrl = "https://functions.kode24.no/api/";

async function makeRequest(api, apiAction, method, data) {
  const url = `${apiUrl}${api}${apiAction}`;
  let response = undefined;
  try {
    response = await axios({
      method: method,
      url: url,
      data: data,
    });
    return {
      success: true,
      response: response.data,
    };
  } catch (e) {
    return {
      success: false,
      response: e.response.data,
    };
  }
}

export default makeRequest;

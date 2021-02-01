import makeRequest from "./helpers";

const api = "events";

async function getSheet() {
  const response = await makeRequest(api, "");
  if (response.success) return response.response;
  return false;
}

export { getSheet };

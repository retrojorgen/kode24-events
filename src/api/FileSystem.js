const apiUrlBase = "https://joblisting.kode24.no/api/";
//const apiUrlBase = "/api/";

const getAdsByTags = (success, fail) => {
  fetch(`${apiUrlBase}listing/bytags`, {
    method: "get"
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response);
        throw new Error("401");
      }
    })
    .then(response => {
      success(response);
    })
    .catch(error => {
      console.log("error", error);
    });
};

const getAds = (success, fail) => {
  fetch(`${apiUrlBase}listing`, {
    method: "get"
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response);
        throw new Error("401");
      }
    })
    .then(response => {
      success(response);
    })
    .catch(error => {
      console.log("error", error);
    });
};

export { getAds, getAdsByTags };

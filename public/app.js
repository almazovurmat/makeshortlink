// GET-запрос
const getJsonDataApp = async (userId) => {
  try {
    return await axios.get(`/get/${userId}`);
  } catch (error) {
    return error.response;
  }
};

// POST-запрос
const addJsonDataApp = async (dataJson) => {
  try {
    const response = await axios.post(`/generate`, dataJson);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".get").addEventListener("click", async () => {
    const jsText   = document.querySelector(".jsText");
    const labelGet = document.querySelector(".labelGet");
    const getError = document.querySelector(".getError");
    const idData   = document.querySelector("#id");

    const responseData = await getJsonDataApp(idData.value);
    console.log(responseData.data);
    labelGet.innerText = responseData.status === 200 ? "JSON:" : "Error:";
    jsText.innerText   = responseData.status === 200 ? (JSON.stringify(responseData.data) || "No data available") : "";
    getError.innerText = responseData.status === 200 ? "" : (responseData.data && responseData.data.message) || "Unknown error occurred";
  });

  document.querySelector(".post").addEventListener("click", async () => {
    const jsonData  = document.querySelector(".json_data");
    const idText    = document.querySelector(".IdText");
    const labelPost = document.querySelector(".labelPost");
    const postError = document.querySelector(".postError");

    const showSuccessMessage = (responseData) => {
      labelPost.innerText = "Ваш ID: ";
      idText.innerText    = responseData.id;
      postError.innerText = "";
    }

    const showErrorMessage = (errorMessage) => {
      labelPost.innerText = "Error: ";
      idText.innerText    = "";
      postError.innerText = errorMessage;
    }

    const trimmedValue = jsonData.value.trim();

    if (trimmedValue !== "") {
      try {
        const responseData = await addJsonDataApp(JSON.parse(trimmedValue));

        if (responseData.status === 201) {
          showSuccessMessage(responseData);
        } else {
          showErrorMessage(responseData.message);
        }
      } catch (error) {
        showErrorMessage('Data is not json');
      }
    } else {
      showErrorMessage('No data provided');
    }
  });
});

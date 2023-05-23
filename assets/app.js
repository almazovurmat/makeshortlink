// GET-запрос
const getJsonDataApp = async (userId) => {
  try {
    const response = await axios.get(`/get/${userId}`);
    return response;
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
  const getQuery = document.querySelector(".get");
  const postQuery = document.querySelector(".post");

  getQuery.addEventListener("click", () => {
    const jsText = document.querySelector(".jsText");
    const labelGet = document.querySelector(".labelGet");
    const getError = document.querySelector(".getError");
    const idData = document.querySelector("#id");

    getJsonDataApp(idData.value).then((res) => {
      if (res.status === 200) {
        labelGet.innerText = "json:";
        jsText.innerText = JSON.stringify(res.data);
        getError.innerText = "";
      } else {
        labelGet.innerText = "error:";
        jsText.innerText = "";
        getError.innerText = res.data.message;
      }
    });
  });
  postQuery.addEventListener("click", () => {
    const jsonData = document.querySelector(".json_data");
    const idText = document.querySelector(".IdText");
    const labelPost = document.querySelector(".labelPost");
    const postError = document.querySelector(".postError");

    if (jsonData.value.trim() !== "") {
      try {
        addJsonDataApp(JSON.parse(jsonData.value)).then((res) => {
          if (res.status === 201) {
            labelPost.innerText = "id:";
            idText.innerText = res.id;
            postError.innerText = "";
          } else {
            labelPost.innerText = "error:";
            idText.innerText = "";
            postError.innerText = res.message;
          }
        });
      } catch (error) {
        labelPost.innerText = "error:";
        idText.innerText = "";
        postError.innerText = "data is not json";
      }
    } else {
      labelPost.innerText = "error:";
      idText.innerText = "";
      postError.innerText = "not data";
    }
  });
});

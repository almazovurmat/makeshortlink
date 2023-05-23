const express = require("express");
const { getJsonData, addJsonData } = require("./supabase.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("assets"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/get", function (request, response) {
  return response.status(400).json({ message: "empty id" });
});

app.get("/get/:id", function (request, response) {
  const id = request.params.id;

  if (id.length !== 6) {
    return response.status(400).json({ message: "incorrect id" });
  } else {
    getJsonData(id)
      .then(function (data) {
        response.json(data);
      })
      .catch((error) => {
        return response.status(404).json({ message: error.message });
      });
  }
});

app.post("/generate", express.json(), function (request, response) {
  if (!request.body) {
    return response.status(400).json({ message: "no body" });
  }

  addJsonData(request.body)
    .then(function (data) {
      response.json(data);
    })
    .catch((error) => {
      return response.status(400).json({ message: error.message });
    });
});

app.listen(3000, () => console.log("Server run..."));

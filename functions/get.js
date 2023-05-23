const { getJsonData } = require("../supabase.js");

export const handler = async (event) => {
  const pathSplit = event.path.split("/");
  const id = pathSplit[2];
  const regexp = /[^A-Za-z0-9]/;

  if (pathSplit.length < 3) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "incorrect format id",
      }),
    };
  }

  if (id.match(regexp) !== null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "incorrect symbol id",
      }),
    };
  }
  if (id.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "id empty",
      }),
    };
  }
  if (id.length !== 6) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "incorrect length id",
      }),
    };
  }
  try {
    const data = await getJsonData(id);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};

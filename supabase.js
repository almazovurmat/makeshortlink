require("dotenv").config();
const supabase = require("@supabase/supabase-js");
const {getId} = require("./generatorId");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const databaseTable = process.env.DATABASE_TABLE;

const supabaseApp = supabase.createClient(supabaseUrl, supabaseKey);

async function addJsonData(data) {
  try {
    if (typeof data === "object") {
      if (JSON.stringify(data) === "{}") {
        throw SyntaxError("not json");
      }

      const id = getId();
      const {status, error} = await supabaseApp
        .from(databaseTable)
        .insert([{id, data}]);

      if (error) {
        throw Error("no data added");
      }
      return {status, id};
    } else {
      throw SyntaxError("received no json data");
    }
  } catch (e) {
    throw e;
  }
}

async function getJsonData(id) {
  try {
    const {data, error} = await supabaseApp
      .from(databaseTable)
      .select("data")
      .eq("id", id)
      .limit(1)
      .single();
    if (error) {
      throw Error(error.status);
    }
    return data.data;
  } catch (e) {
    throw e;
  }
}

module.exports.addJsonData = addJsonData;
module.exports.getJsonData = getJsonData;

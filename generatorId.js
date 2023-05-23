const { customAlphabet } = require("nanoid");

module.exports = {
  getId: () => {
    const nanoid = customAlphabet(
      "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      6
    );
    return nanoid();
  },
};

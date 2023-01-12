const mongoose = require("mongoose");
const { DB } = process.env;
module.exports = () => {
  try {
    mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Db Connected Successfully`);
  } catch (error) {
    console.log(`DB connection FAILED`);
    console.log(error);
    process.exit(1);
  }
};

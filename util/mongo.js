require('dotenv').config();
const mongoose = require('mongoose');
const mongoPath = process.env.mongoPath;

module.exports = () => {
  mongoose
    .connect(mongoPath, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connected to mongo!'));
};

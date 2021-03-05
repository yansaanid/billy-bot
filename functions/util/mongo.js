const mongoose = require("mongoose")
const { mongoTest } = require("../config/main.json")

module.exports = async () => {
  await mongoose.connect(mongoTest, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return mongoose
}
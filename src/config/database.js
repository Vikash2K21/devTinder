const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
    "mongodb+srv://vikashmrh1:pWEejMRtKNfWcCbh@cluster0.mzhb8wk.mongodb.net/devTinder"
    );
};


module.exports = connectDB;

 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
         type: String,
         required:true,
         minlength: 4,
         maxlength: 20, // Ensure firstName is between 4 and 20 characters
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true, // Ensure emailId is stored in lowercase
        unique: true, // Ensure emailId is unique
        trim: true, // Remove leading and trailing whitespace
    },
    password: {
        type: String,
        required: true, // Ensure password is unique
    },
    age: {
        type: Number,
        min: 18, // Ensure age is at least 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female","others"].includes(value)){
                throw new Error("Gender daat is not valid");
                
            }
        }, 
    },
    photUrl: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Ddefault%2Bprofile%2Bpicture&psig=AOvVaw3tjYJPTU9sy4F__WjkQi4A&ust=1755537270636000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLiV246sko8DFQAAAAAdAAAAABAE",
    },
    about:{
        type: String,
        default: "This is a Defauult Values of the User",
    },
    skills:{
        type:[String],
    },
 
},  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
   });    

module.exports = mongoose.model("User", userSchema);
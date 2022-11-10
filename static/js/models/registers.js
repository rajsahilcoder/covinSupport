const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        USN:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        Name:{
            type: String,
            required: true
        },
        Branch:{
            type: String,
            required: true
        },
        Phone:{
            type: Number,
            required: true,
            unique: true
        }
    }
)

// now we need to create a collection

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;
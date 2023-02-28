const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({

    firstName: {
        type: String,
        required: [true, 'First name is required !']
    },

    lastName: {
        type: String,
        required: [true, 'Last name is required !']
    },

    mobileNo: {
        type: String,
        required: [true, 'Mobile number is required !'],
    },

    image: {
        type: String,
        required: [true, 'Image is required !'],
    },

    email: {
        type: String,
        required: [true, 'Email is required !'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required !']
    }

})

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;


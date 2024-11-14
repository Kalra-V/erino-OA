import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    company: {
        type: String,
    },
    jobTitle: {
        type: String,
    }
})

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
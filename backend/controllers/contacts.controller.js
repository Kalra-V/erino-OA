import Contact from "../models/contact.model.js";

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            message: "getContacts controller working.",
            contacts
        })
    } catch (error) {
        console.log("Error in getContacts controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const postContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phoneNumber,
            company,
            jobTitle
        })

        await newContact.save();

        res.status(201).json({
            message: "postContact controller working.",
            firstName: newContact.firstName,
            email: newContact.email,
        })
    } catch (error) {
        console.log("Error in postContact controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export const putContact = async (req, res) => {
    try {
        const { id } = req.params;
        
        const existingContact = await Contact.findById(id);

        if(!existingContact) {
            return res.status(404).json({ error: "Contact does not exist"})
        }

        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({
            message: "putContact controller working with id: " + id,
            contact: updatedContact
        })
    } catch (error) {
        console.log("Error in putContact controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const existingContact = await Contact.findById(id);

        if(!existingContact) {
            return res.status(404).json({
                error: "Contact does not exist"
            })
        }

        const deletedContact = await Contact.findByIdAndDelete(id);

        res.status(200).json({
            message: "deleteContact controller working with id: " + id,
            deletedContact
        })
    } catch (error) {
        console.log("Error in deleteContact controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
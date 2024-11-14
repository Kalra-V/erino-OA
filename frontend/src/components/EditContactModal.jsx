import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const EditContactModal = ({ contact, onClose, onSave }) => {
    const [firstName, setFirstName] = useState(contact.firstName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
    const [email, setEmail] = useState(contact.email);
    const [company, setCompany] = useState(contact.company);
    const [jobTitle, setJobTitle] = useState(contact.jobTitle);

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3002/contacts/${contact._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    company,
                    jobTitle,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            onSave();
            onClose();
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={{ 
                bgcolor: 'background.paper', 
                borderRadius: 2, 
                boxShadow: 24, 
                p: 4, 
                maxWidth: '90vw', 
                width: 400, 
                maxHeight: '80vh', 
                overflowY: 'auto', 
                mx: 'auto', 
                my: '10vh', // Center vertically with margin
            }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Edit Contact
                </Typography>
                <TextField 
                    label="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                />
                <TextField 
                    label="Last Name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                />
                <TextField 
                    label="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                />
                <TextField 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                />
                <TextField 
                    label="Company" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                />
                <TextField 
                    label="Job Title" 
                    value={jobTitle} 
                    onChange={(e) => setJobTitle(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditContactModal;

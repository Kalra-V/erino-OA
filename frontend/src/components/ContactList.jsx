import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid2, IconButton, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, TablePagination } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import EditContactModal from "./EditContactModal"
import useContacts from '../hooks/useContacts';

const ContactList = () => {
    // const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('firstName');
    const { contacts, fetchContacts } = useContacts();
    

    useEffect(() => {
        fetchContacts();
    }, [contacts]);

    const handleEdit = (contact) => {
        setSelectedContact(contact)
        console.log('Editing contact:', contact);
    };

    const handleDelete = async (contactId) => {
        console.log("Contact ID: ", contactId);
        try {
            const response = await fetch(`http://localhost:3002/contacts/${contactId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // setContacts(contacts.filter((contact) => contact.id !== contactId));
            fetchContacts()
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedContacts = [...contacts].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // if(contacts.length == 0) {
    //     return (
    //         <div>No contacts found</div>
    //     )
    // }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            {selectedContact && (
                <EditContactModal 
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
                onSave={() => {
                    setSelectedContact(null);
                    fetchContacts();
                }}
                />
            )}
            <Typography variant="h4" component="h1" gutterBottom>
                Contacts
            </Typography>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={() => handleRequestSort('firstName')}>First Name</TableCell>
                                <TableCell onClick={() => handleRequestSort('lastName')}>Last Name</TableCell>
                                <TableCell onClick={() => handleRequestSort('phoneNumber')}>Phone Number</TableCell>
                                <TableCell onClick={() => handleRequestSort('email')}>Email</TableCell>
                                <TableCell onClick={() => handleRequestSort('company')}>Company</TableCell>
                                <TableCell onClick={() => handleRequestSort('jobTitle')}>Job Title</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? sortedContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : sortedContacts
                            ).map((contact) => (
                                <TableRow key={contact._id}>
                                    <TableCell>{contact.firstName}</TableCell>
                                    <TableCell>{contact.lastName}</TableCell>
                                    <TableCell>{contact.phoneNumber}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.company}</TableCell>
                                    <TableCell>{contact.jobTitle}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(contact)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(contact._id)} sx={{ ml: 1 }}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={contacts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Container>
    );
};

export default ContactList;
import { useState, useEffect } from 'react';

const useContacts = () => {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://localhost:3002/contacts');
            const data = await response.json();
            setContacts(data.contacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return { contacts, fetchContacts };
};

export default useContacts;
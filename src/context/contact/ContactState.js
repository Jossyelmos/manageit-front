import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contatcReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    UPDATE_CONTACT,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('https://manageit-back.onrender.com/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };
    // Add Contacts
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('https://manageit-back.onrender.com/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`https://manageit-back.onrender.com/api/contacts/${id}`);

            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Set Current
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    }

    // Clear Current
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    }
    // Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`https://manageit-back.onrender.com/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (err) {  
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Filter Contact
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    }

    // Clear Filter
    const clearFilter = () => dispatch({ type: CLEAR_FILTER });

    // Clear Contacts
    const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
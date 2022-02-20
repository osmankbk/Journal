// File with Data class containing all HTTP functions

import config from "./config";

export default class Data {
    api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const url = config.apiBaserUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        if(body !== null) {
            options.body = JSON.stringify(body);
        }
        if(requiresAuth) {
            const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }
    // Create a User / Sign up
    createUser = async(user) => {
        const response = await this.api('/register', 'POST', user);
        if(response.status === 201) {
            return [];
        } else if( response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        throw new Error();
    }

    // Get user from Database
    getUser = async(email, password) => {
        const response = await this.api('/users', 'GET', null, true, { email, password });
        if(response.status === 200 || response.status === 304) {
            return response.json().then(data => data);
        } else if(response.status === 401) {
            return null;
        } else {
            throw new Error("An error occured");
        }
    }

    // Reset Password Request
    requestResetPass = async(user) => {
        const response = await this.api('/passwordreset', 'POST', user);
        if(response.status === 200) {
            return response.json().then(data => data);
        } else if(response.status === 400) {
            return null;
        }
        else {
            throw new Error("An error occured");
        }
    }

    // Reset Password
    resetPassword = async(userId, token, user) => {
        const response = await this.api(`/passwordreset/${userId}/${token}`, 'POST', user);
        if(response.status === 204) {
            return null;
        } else if (response.status === 400) {
            return response.json().then(data => data);
        } else {
            throw new Error("An unexpected error occured!")
        }
    }

    // Create a journal entry
    createEntry = async(entry, email, password) => {
        const response = await this.api('/entries', 'POST', entry, true, { email, password });
        if(response.status ===  201) {
            return null;
        } else if(response.status === 400 || response.status === 401) {
            return response.json().then(data => data.error);
        } else {
            throw new Error("An unexpected error occured!");
        }
    }

    getSingleEntry = async(entryId) => {
        const response = await this.api(`/entries/${entryId}`, 'GET');
        if(response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 404) {
            return response.json().then(data => data.error);
        }
        throw new Error();
    }

    getAllJournalEntries = async(email, password, page) => {
        const response = await this.api(`/entries${page}`, 'GET', null, true, { email, password})
        if(response.status === 200) {
            return response.json().then(data => data);
        } else {
            return null;
        }
    }

    updateJournal = async (entryId, entry) => {
        const response = await this.api(`/entries/${entryId}`, 'PUT', entry);
        if(response.status === 204) {
            return null;
        } else if(response.status === 404) {
            return response.json().then(data => data.error);
        }
        throw new Error();
    }

    deleteJournal = async (entryId) => {
        const response = await this.api(`/entries/${entryId}`, 'DELETE');
        if(response.status === 204) {
            return null;
        } else if(response.status === 404) {
            return response.json().then(data => data.error);
        }
        throw new Error();
    }

    createEntryM = async(entry, email, password) => {
        const response = await this.api('/meditations', 'POST', entry, true, { email, password });
        if(response.status ===  201) {
            return null;
        } else if(response.status === 400 || response.status === 401) {
            return response.json().then(data => data.error);
        } else {
            throw new Error();
        }
    }
    getSingleThought = async(entryId) => {
        const response = await this.api(`/meditations/${entryId}`, 'GET');
        if(response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 404) {
            return response.json().then(data => data.error);
        }
        throw new Error();
    }

    getAllMeditations = async(email, password, page) => {
        const response = await this.api(`/meditations${page}`, 'GET', null, true, { email, password})
        if(response.status === 200) {
            return response.json().then(data => data);
        } else {
            return null;
        }
    }

    updateMeditation = async (entryId, entry) => {
        const response = await this.api(`/meditations/${entryId}`, 'PUT', entry);
        if(response.status === 204) {
            return null;
        } else if(response.status === 404) {
            return response.json().then(data => data.error);
        }
        throw new Error();
    }

    deleteMeditation = async (entryId) => {
        const response = await this.api(`/meditations/${entryId}`, 'DELETE');
        if(response.status === 204) {
            return null;
        } else if(response.status === 404) {
            return response.json().then(data => data.error);
        }
        throw new Error();
    }
}

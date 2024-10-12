// src/utils.js
const suggestions = {
    email: 'Please provide a valid email address.',
    password: 'Your password should be at least 8 characters long and include at least one uppercase letter, one number, and one symbol.',
    username: 'Username must be 3-16 characters long and only contain alphanumeric characters.',
    phoneNumber: 'Please provide a valid phone number with the correct format.',
    website: 'Please provide a valid website URL.',
};

const getSuggestions = (formData) => {
    const { email, password, username, phoneNumber, website } = formData;
    const errors = [];

    if (!email.includes('@')) {
        errors.push(suggestions.email);
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        errors.push(suggestions.password);
    }
    if (username.length < 3 || username.length > 16 || !/^[a-zA-Z0-9]+$/.test(username)) {
        errors.push(suggestions.username);
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
        errors.push(suggestions.phoneNumber);
    }
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(website)) {
        errors.push(suggestions.website);
    }

    return errors;
};

module.exports = { getSuggestions };

// src/basicValidator.js
const Validator = require('validatorjs');

// Custom validators
const basicValidator = {
    isEmail: (value) => {
        const validation = new Validator({ email: value }, { email: 'required|email' });
        return validation.passes();
    },
    isNotEmpty: (value) => value.trim() !== '',
    isStrongPassword: (value) => {
        // Strong password: at least 8 characters, 1 number, 1 uppercase, and 1 symbol
        const validation = new Validator({ password: value }, { password: 'required|min:8|regex:/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/i' });
        return validation.passes();
    },
    isValidUsername: (value) => {
        // Username: alphanumeric, 3-16 characters
        const validation = new Validator({ username: value }, { username: 'required|alpha_num|min:3|max:16' });
        return validation.passes();
    },
    isValidPhoneNumber: (value) => {
        // Phone number validation: use a regex to match valid phone number formats
        const validation = new Validator({ phoneNumber: value }, { phoneNumber: 'required|regex:/^\\+?[1-9]\\d{1,14}$/' });
        return validation.passes();
    },
    isValidURL: (value) => {
        // URL validation
        const validation = new Validator({ url: value }, { url: 'required|url' });
        return validation.passes();
    },
};

module.exports = basicValidator;

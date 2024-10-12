const { validateForm } = require('ai-powered-form-validator');

const formData = {
    email: 'user@example.com',
    password: 'StrongPass123!',
    username: 'validuser',
    phoneNumber: '+1234567890',
    website: 'https://example.com',
};

const result = validateForm(formData);

if (result.isValid) {
    console.log('Form is valid!');
} else {
    console.log('Form is invalid. Suggestions:', result.suggestions);
}

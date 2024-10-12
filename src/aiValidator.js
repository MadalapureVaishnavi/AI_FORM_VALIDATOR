const { Layer, Network, Trainer } = require('synaptic');
const { isEmail, isNotEmpty, isStrongPassword, isValidUsername, isValidPhoneNumber, isValidURL } = require('./basicValidator');
const { getSuggestions } = require('./utils');

// Create layers
const inputLayer = new Layer(5);  // We now have 5 inputs: email, password, username, phone number, URL
const hiddenLayer = new Layer(5);
const outputLayer = new Layer(1);

// Connect layers
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

// Create a network
const network = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer,
});

// Training data (expanded for multiple fields)
const trainingData = [
    { input: [0.8, 0.1, 1, 0, 0.9], output: [1] },
    { input: [0.1, 0.1, 0, 1, 0.2], output: [0] },
    { input: [0.9, 0.7, 1, 0.8, 1], output: [1] },
    { input: [0.1, 0.8, 0, 0.1, 0.2], output: [0] },
    // More data can be added over time
];

// Create a trainer
const trainer = new Trainer(network);
trainer.train(trainingData, {
    rate: 0.1,
    iterations: 20000,
    error: 0.005,
});

// Function to validate form with AI assistance
const aiValidator = {
    validateForm: (formData) => {
        const { email, password, username, phoneNumber, website } = formData;

        // Basic validation
        let isValid = isEmail(email) && isStrongPassword(password) && isValidUsername(username) && isValidPhoneNumber(phoneNumber) && isValidURL(website);

        // Normalize inputs for AI model (mapping field results to 0 or 1)
        const normalizedInput = [
            isEmail(email) ? 1 : 0,
            isStrongPassword(password) ? 1 : 0,
            isValidUsername(username) ? 1 : 0,
            isValidPhoneNumber(phoneNumber) ? 1 : 0,
            isValidURL(website) ? 1 : 0,
        ];

        // Get AI prediction
        const output = network.activate(normalizedInput);

        if (output[0] < 0.5) {
            isValid = false;
        }

        // Get suggestions if form is invalid
        const suggestions = !isValid ? getSuggestions(formData) : null;

        return {
            isValid,
            suggestions,
        };
    },
};

module.exports = aiValidator;

// The model(s) save(s) data in the database (MongoDB)
// Everything that interacts with the database will use mongoose

const mongoose = require('mongoose')

// Create the schema
const contactSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            // "Please enter product name" is validation
            required: [true, "Please enter a first name."] 
        },
        lastName: {
            type: String,
            required: [true, "Please enter a last name."]
        },
        email: {
            type: String,
            required: [true, "Please enter a valid email."]
        },
        favoriteColor: {
            type: String,
            required: [true, "Please enter a favorite color."]
        },
        birthday: {
            type: String,
            required: [true, "Please enter a birthdate."]
        }
    },
    {
        // Used to create two fields which keep track of when data is created and updated (when data is saved to the database and when it is modified)
        timestamps: true
    }
)


// Create the model
// Model named Contact
const Contact = mongoose.model('Contact', contactSchema);


// Export the module
module.exports = Contact;
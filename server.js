const express = require('express')
const mongoose = require('mongoose')
// Import contactModel (creates "Product" collection in MongoDB)
const Contacts = require('./models/contactModel')
const app = express()

const port = process.env.PORT || 8080

// Declare middleware (express middleware)
// as json datatype
app.use(express.json())
// as urlencoded datatype
app.use(express.urlencoded({extended: false}))

// Connect to MongoDB database
mongoose.connect('mongodb+srv://perkinsn:tOAgnMJnxPKtiLUi@cluster0.zconyjz.mongodb.net/test')
.then(() => {
    console.log('connected to MongoDB')
    // Create an app ***
    app.listen(port, () => {
        console.log(`Node API app is running on port ${port}`)
    });
    // *****************
}).catch(() => {
    console.log(error)
})

// Declare routes to run the app on a browser
app.get('/', (req, res) => {
    res.send('Hello Contacts API')
})

// Fetch or Get all data from MongoDB
app.get('/contacts', async(req, res) => {
    try {
        // Declare the "contacts" variable
        const contacts = await Contacts.find({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get a "contact" by its ID
app.get('/contacts/:id', async(req, res) => {
    try {
        const {id} = req.params;
        // Declare the "contact" variable
        const contact = await Contacts.findById(id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Route for saving data into the database
app.post('/contacts', async(req, res) => {
    // Save data that we get from the request of the client to the database
    try {
        // Save the contact data throught the productModel to the database. Create with "req.body" data.
        const contact = await Contacts.create(req.body)
        // Respond with the data that you saved into the database
        res.status(200).json(contact);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// Update or edit data in database (Update a 'product')
app.put('/contacts/:id', async(req, res) => {
    try {
        // Deconstruct {id} from reqest params
        const {id} = req.params;
        // req.body is the data you want to update
        const contact = await Contacts.findByIdAndUpdate(id, req.body);
        // Check if it is updated (!contact)
        if (!contact) {
            return res.status(404).json({message: `Cannot find any contact with ID ${id}`})
        }
        // Else
        const updatedContact = await Contacts.findById(id);
        res.status(200).json(updatedContact);
        // res.status(200).json(contact);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Remove or delete data from database (delete a 'contact')
app.delete('/contacts/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const contact = await Contacts.findByIdAndDelete(id);
        // If there is no contact
        if (!contact) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
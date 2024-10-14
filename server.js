const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee'); 

require('dotenv').config();
const app = express();

app.use(bodyParser.json()); 


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));


app.use('/api/v1/emp', employeeRoutes); 

const port = process.env.PORT || 3010; //make sure to remember what port :):
app.listen(port, () => console.log(`Server running on port ${port}`));

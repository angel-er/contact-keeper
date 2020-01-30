const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extend: false}));

app.get('/', (req, res) => {
  res.json({message: 'Welcome to ContactKepeer'});
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server on port: ${port}`));

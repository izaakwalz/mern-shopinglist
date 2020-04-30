const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

// const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('MongoURI');

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err));

// use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve Statcic assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5050;

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);

const express = require('express');
const mealController = require('./api/meal');

const app = express();

app.use(express.static('dist'));

// Routes
app.get('/api/meal', mealController.getMeal);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

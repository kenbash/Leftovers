const express = require('express');

const app = express();

app.use(express.static('dist'));
app.get('/api/mealPlan', (req, res) => res.send({ meal: 'steak, potatoes' }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

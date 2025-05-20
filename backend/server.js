const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');;
require('dotenv').config(); 
const userRoutes = require('./routes/UserRoutes');
const restaurantRoutes = require('./routes/RestaurantRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); 
const path = require('path');


const app = express();
const port = 4000;
app.use(cors());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/reviews', reviewRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Povezava z MongoDB uspešna!');
  })
  .catch((err) => {
    console.error('Napaka pri povezavi z MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Strežnik posluša na http://localhost:${port}`);
});

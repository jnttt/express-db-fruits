require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require('./models/fruit');
const Vegetable = require('./models/vegetable');
const { connect, connection } = require('mongoose');

// Database connection
connect(process.env.MONGO_URI, {
  // Having these two properties set to true is best practice when connecting to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// This line of code will run the function below once the connection to MongoDB has been established.
connection.once('open', () => {
  console.log('connected to mongo');
});

// View Engine Middleware Configure
const reactViewsEngine = require('jsx-view-engine').createEngine();
app.engine('jsx', reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set('view engine', 'jsx');
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set('views', './views');

// Custom Middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log('Middleware running...');
  next();
});

// I.N.D.U.C.E.S
// ==============
// Index
app.get('/fruits', async (req, res) => {
  console.log('Index Controller Func. running...');
  try {
    const foundFruit = await Fruit.find({});
    res.status(200).render('fruits/Index', { fruits: foundFruit });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New // renders a form to create a new fruit
app.get('/fruits/new', (req, res) => {
  res.render('fruits/New');
});

// Create // recieves info from new route to then create a new fruit w/ it
app.post('/fruits', async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === 'on';
    const newFruit = await Fruit.create(req.body);
    console.log(newFruit);
    //console.log(fruits);
    // redirect is making a GET request to whatever path you specify
    res.redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Show
app.get('/fruits/:id', async (req, res) => {
  try {
    // We are using the id given to us in the URL params to query our database.
    const foundFruit = await Fruit.findById(req.params.id);
    res.render('fruits/Show', {
      //second param must be an object
      fruit: foundFruit,
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    });
  } catch (err) {
    res.status(400).send(err);
  }
});



// I.N.D.U.C.E.S
// ==============
// Index
app.get('/vegetables', async (req, res) => {
  console.log('Index Controller Func. running...');
  try {
    const foundVegetable = await Vegetable.find({});
    res.status(200).render('vegetables/Index', { vegetables: foundVegetable });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New // renders a form to create a new fruit
app.get('/vegetables/new', (req, res) => {
  res.render('vegetables/New');
});

// Create // recieves info from new route to then create a new fruit w/ it
app.post('/vegetables', async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === 'on';
    const newVegetable = await Vegetable.create(req.body);
    console.log(newVegetable);
    //console.log(fruits);
    // redirect is making a GET request to whatever path you specify
    res.redirect('/vegetables');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Show
app.get('/vegetables/:id', async (req, res) => {
  try {
    // We are using the id given to us in the URL params to query our database.
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.render('vegetables/Show', {
      //second param must be an object
      vegetable: foundVegetable,
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
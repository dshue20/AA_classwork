const express = require('express');
const app = express();
const routes = require('./routes');

app.set('view engine', 'pug');

app.use('/capital-letters', routes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get(/xyz$/, (req, res) => {
  res.send("That's all I wrote.");
});

app.get(/\/bio$/, (req, res) => {
  res.send('Bio');
});

app.get(/\/contact$/, (req, res) => {
  res.send('Contact');
});

// app.get('/about/foo', (req, res) => {
//   res.status = 404;
//   res.send();
// })

app.all(/^\/[\w-]*$/, (req, res) => {
  res.render('phase2', { method: req.method, path: req.path, randNum: Math.floor(Math.random() * 100) });
});

const port = 8081;
app.listen(port, () => console.log(`App is listening on port ${port}...`));
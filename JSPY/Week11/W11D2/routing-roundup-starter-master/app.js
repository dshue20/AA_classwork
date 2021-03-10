const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.send("Hello from Express!");
});

app.get('/*xyz', (req, res) => {
  res.send('That\'s all I wrote.');
});

app.all('*', (req, res) => {
  res.render('phase2', { method: req.method, path: req.path, num: 1 });
})

const port = 8081;
app.listen(8081, () => console.log(`App is listening on port ${port}...`));

const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => res.send('Hello from App3'));

app.listen(port, () => console.log(`App3 listening on port ${port}`));

'use strict';

const express = require('express')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/pub')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/welcome.html'));
})

app.get('/examples', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/examples.html'));
})

app.get('/documentation', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/documentation.html'));
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 8080;


app.use(express.static('public'));


app.get('/business', (req, res) => {
    console.log('GET /business');
    res.sendFile(path.join(publicPath, 'business.html'));

})

app.get('/personal', (req, res) => {
    console.log('GET /personal');
    res.sendFile(path.join(publicPath, 'personal.html'));
})

app.get('/auto', (req, res) => {
    console.log('GET /auto');
    res.sendFile(path.join(publicPath, 'auto.html'));
})

app.get('/home', (req, res) => {
    console.log('GET /home');
    res.sendFile(path.join(publicPath, 'home.html'));
})

app.get('/', (req, res) => {
    console.log('GET /')
    res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
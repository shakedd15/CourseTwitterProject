let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
var route = require('./public/routes/routes.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('./public'));


const PORT = 8000;

route(app);

app.listen(PORT, function () {
    console.log('app listening on port: ' + PORT);
});
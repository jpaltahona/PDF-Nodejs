const express = require('express');
const bodyParser = require ("body-parser");
const path = require('path');
const routes = require('./routes');
const app = express();
const fileUpload = require('express-fileupload');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.set('port', process.env.PORT || 4000);

app.use(  bodyParser.urlencoded({  extended: false }));
app.use(bodyParser.json());

/* // Subir archivos
app.use(fileUpload({
    useTempFiles : true,c
    tempFileDir : '/tmp/'
})); */

routes(app)
//app.use('/storage/images/', express.static(`${__dirname}/storage/pdf`));
//app.use('/storage/images/', express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

const rutaFiles = path.join(__dirname, 'public');
console.log(rutaFiles);
app.use(express.static(rutaFiles));
module.exports = app;
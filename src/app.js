const express = require('express');
const bodyParser = require ("body-parser");
const multer = require('multer');
const path = require('path');
const routes = require('./routes');
const app = express();

const storage = multer.diskStorage({
    destination: path.join(__dirname ,'storage/pdf') ,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.set('port', process.env.PORT || 4000);

app.use(  bodyParser.urlencoded({  extended: false }));
app.use(bodyParser.json());

// Subir archivos
app.use(multer({
    storage,
    dest: path.join(__dirname ,'storage/pdf'),
    limits: { fileSize: 6000000}
}).fields(
    [
        {
            name: 'pdf', maxCount: 1
        }
    ]
));
routes(app)
app.use('/storage/images/', express.static(`${__dirname}/storage/pdf`));

module.exports = app;
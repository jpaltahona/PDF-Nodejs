
const express = require('express')
const router = express.Router();

const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
router.post('/', async (req, res) => {
    console.log(req);
    res.send("hello")
})
router.get('/', (req, res, next) =>{
  res.render('index.pug')
})


module.exports = router
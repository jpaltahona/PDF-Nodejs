
const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

//const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');

router.post('/', async (req, res) => {
    console.log(req.files);
    res.send("hello")
})

async function run() {
  // Load cover and content pdfs

  const rutaPDF = path.join(__dirname, '../utils/Jamar.pdf')

  const content = await PDFDocument.load(fs.readFileSync(rutaPDF));
  const helveticaFont = await content.embedFont(StandardFonts.Helvetica);  
  const pages = content.getPages();
  const form = content.getForm();
  const superheroField = form.createTextField('favorite.superhero')
  superheroField.setText('One Punch Man');


  for (const [i, page] of Object.entries(pages)) {
    page.drawText( `${+i + 1}`, 
      {
        x: page.getWidth() / 2,
        y: 10,
        size: 15,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      }
    );
  }
  // Write the PDF to a file
  fs.writeFileSync('./test.pdf', await content.save());

}


router.get('/', async (req, res, next) =>{
  await run();
  res.render('index.pug')
});

router.get('/create', (req, res, next) =>{
  res.render('create.pug')
})


module.exports = router
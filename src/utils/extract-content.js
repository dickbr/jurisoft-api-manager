const path = require('path')
const PDFExtract = require('pdf.js-extract').PDFExtract;
const options = {};
const pdfExtract = new PDFExtract();

const getPdfContent = async (file) => {
  const filePath = path.join(__dirname, '..', '..', file.path)
  const fileContent = [];
  return new Promise((resolve, reject) => {
    pdfExtract.extract(filePath, options, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        data.pages.forEach((page) => {
          page.content.map(({ str }) => {
            if (str.trim() === '') {
              return
            }

            fileContent.push(str);
          })
        })
        resolve(fileContent);
      }
    });
  });
}

const getContent = async (file) => {
  switch (file.mimetype) {
    case 'application/pdf':
      return await getPdfContent(file);
    default:
      break
  }
}

module.exports = {
  getContent
};
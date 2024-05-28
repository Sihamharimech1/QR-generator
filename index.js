const QRCode = require('qrcode');
const fs = require('fs');
const qrterminal = require('qrcode-terminal');

const generateQRCode = async (data) => {
  try {
    const jsonString = JSON.stringify(data);
    const qrCodeDataUrl = await QRCode.toDataURL(jsonString);
    qrterminal.generate(jsonString, { small: true });
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QR Code</title>
      </head>
      <body>
        <h1>QR Code</h1>
        <img src="${qrCodeDataUrl}" alt="QR Code">
      </body>
      </html>
    `;

    fs.writeFileSync('qrcode.html', htmlContent);
    console.log('QR code has been generated and saved to qrcode.html');
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
};

const data = {
  username: 'john_doe',
  eventname: 'Tech Conference',
  date: '2024-06-15'
};
generateQRCode(data);

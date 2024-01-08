const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.post('/submitForm', (req, res) => {
    try {
      const formData = req.body;
  
      // Validate required fields
      if (!formData.name || !formData.email || !formData.address || !formData.phoneNumber) {
        throw new Error('Required fields are empty');
      }
  
      // Validate email format
      const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
      if (!regex.test(formData.email)) {
        throw new Error('Invalid email format');
      }
  
      // If all validations pass, save the form data to CSV file and send a success response
      const csvData = `${formData.name},${formData.email},${formData.address},${formData.phoneNumber}\n`;
      fs.appendFileSync('formData.csv', csvData);
      res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error processing form:', error);
      res.status(500).json({ success: false, message: 'Error processing the form' });
    }
  });
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js and React Application!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

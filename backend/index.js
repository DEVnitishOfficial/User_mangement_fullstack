require('dotenv').config();
const port=process.env.PORT || 3000;

const app = require('./app.js');


app.listen(port, () => {
    console.log(`Usermanagement server is listening at http://localhost:${port}`)
})
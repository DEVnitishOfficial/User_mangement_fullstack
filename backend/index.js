// import app from "./app";
const app = require('./app.js');
const port=process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Usermanagement server is listening at http://localhost:${port}`)
})
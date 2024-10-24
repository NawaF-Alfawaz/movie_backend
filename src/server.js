const app = require('./app');
const database = require('./config/database');



const PORT =  3000;
const HOST = 'http://localhost';
app.listen(PORT, () => {
  console.log(`Server running at ${HOST}:${PORT}`);
});

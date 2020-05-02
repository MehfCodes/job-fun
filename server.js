const mongoose = require('mongoose');
const env = require('dotenv');
const app = require('./app.js');
// dotenv setup
env.config({ path: './config.env' });

// database configuration

// let dbUrl;
// if (process.env.NODE_ENV === 'test') {
//   dbUrl = process.env.DB_TEST_URL;
// } else {
//   dbUrl = process.env.DB_LOCAL_URL;
// }
mongoose
  .connect(process.env.DB_LOCAL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    // clear console in production
    console.log('connecting to database ...');
  })
  .catch(() => {
    // clear console in production
    console.log('can not connect to database !!!');
  });

const port = process.env.NODE_ENV === 'test' ? 5000 : process.env.PORT;
// eslint-disable-next-line no-console
// const server1 =
app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on 8000 ....`);
});

// module.exports = server1;

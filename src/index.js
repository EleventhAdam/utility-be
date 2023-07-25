if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const express = require('express');
const router = require('./routers');
require('./config/config');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const {contractListen} = require('./listener/listener');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./config/dbconfig');

const PORT = process.env.PORT;
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(router);

// DO NOT DELETE
// contractListen();

app.listen(PORT, () => {
  console.log('server is live', PORT);
});

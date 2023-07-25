const mongoose = require('mongoose');

const DBurl = process.env.MONGO_DB_CONNECTION_STR;

mongoose.set('strictQuery', true);

const options = {
  dbName: 'pointsix_nft_utility',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DBurl, options).then(() => console.log('connection successfull'))
    .catch((err) => console.log(err));

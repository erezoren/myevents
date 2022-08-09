const mongoose = require("mongoose");
const retry = require('async-retry');

const connectMongodb = async (dbConfig) => {
  let numRetries = dbConfig.numConnectionRetries;
  const connection = `mongodb://${dbConfig.usr}:${dbConfig.pwd}@${dbConfig.host}/${dbConfig.dbName}`;
  console.log("CONN IS " + connection)
  await retry(
      async () => {
          console.info(`Trying to connect to Mongodb (Got ${--numRetries} to go)`)
          return mongoose.connect(connection, {useNewUrlParser: true});

      },
      {
        retries: dbConfig.numConnectionRetries,
      }
  );
};

module.exports = connectMongodb;
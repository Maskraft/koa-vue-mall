const mongoose = require('mongoose');
const db = 'mongodb://localhost/mongo-db';
const glob = require('glob');
const {resolve} = require('path');

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
};

exports.connect = () => {
  // データベースにつながる
  mongoose.connect(db);
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {

    mongoose.connection.on('disconnected', () => {
      console.log('***** データベースのコネクションが切れた *****');
      if (maxConnectTimes <= 3) {
        maxConnectTimes++;
        mongoose.connect(db)
      } else {
        reject();
        throw new Error('***** データベースエラー、三回再接続でも解決できない *****')
      }
    });

    mongoose.connection.on('error', (err) => {
      console.log('***** データベースエラー *****');
      if (maxConnectTimes <= 3) {
        maxConnectTimes++;
        mongoose.connect(db)
      } else {
        reject(err);
        throw new Error('***** データベースエラー、三回再接続でも解決できない *****')
      }
    });

    mongoose.connection.once('open', () => {
      console.log('***** MongoDBに接続しました *****');
      resolve()
    })

  })

};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectID;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// スキーマ定義
const userSchema = new Schema({
  UserId: ObjectId,
  userName: {unique: true, type: String},
  password: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
});

// ソルトを加えて暗号化
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next()
    })
  })
});

// スキーマメソッド
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err)
      })
    })
  }
};

// Modelを登録
mongoose.model('User', userSchema);

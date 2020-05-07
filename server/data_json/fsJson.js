const fs = require('fs');

// fsモジュールのテスト用 ＆ goods.jsonをクリーニング用
fs.readFile('./goods.json', 'utf8', function (err, data) {

  let newData = JSON.parse(data);
  let i = 0;
  let pushData = [];
  newData.RECORDS.map(function (value, index) {
    if (value.IMAGE1 != null) {
      i++;
      console.log(value.NAME);
      pushData.push(value)
    }
  });
  console.log(i);

  fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
    if(err) console.log('書き込み失敗');
    else console.log('書き込み成功');
  });

});

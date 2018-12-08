const XLSX = require('xlsx');
const outputComment = {
  // 输出到控制台
  outputConsole: function outputConsole({ title, songList }) {
    console.log('========================标题', title, '开始========================');
    songList.forEach(function (value, index, array) {
      console.log('歌曲', value);
    })
    console.log('========================标题', title, '结束========================');
  },
  // 输出到excel
  outputExcel: function outputExcel({title, songList}, path) {
    // 创建一个Excel，写入数据
    const workbook = XLSX.readFile(path);
    var worksheet = workbook.Sheets['Sheet1']
    worksheet = XLSX.utils.aoa_to_sheet([
      [title],
      songList.map(value => value)
    ]);
    XLSX.writeFile(workbook, path);
  },
  // 写入到mongoDB
  outputMongoDB: function name(...data) {
    
  }
       
}
module.exports = outputComment;
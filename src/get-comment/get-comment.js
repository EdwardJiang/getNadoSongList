const XLSX = require('xlsx');
const XlsxPopulate = require('xlsx-populate');
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
    let workbook = XLSX.readFile(path);
    let worksheet = workbook.Sheets['Sheet1']
    let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    let newData = [];
    // 如果数据不存在
    if (data && data.length > 0) {
      data = data.concat([title], songList);     
    } else {
      data = newData.concat([title],songList);
    }
    data = data.map(value => [value])
    // console.log(data);
    XLSX.utils.sheet_add_aoa(worksheet, data);
    XLSX.writeFile(workbook, path);
    /* xlsx */
 
    // xlsx-populate
    // XlsxPopulate.fromFileAsync(path)
    //   .then(workbook => {
    //     // Modify the workbook.
    //     var songLists = songList.map(value => [value])
    //     // workbook.sheet(0).cell("A1").value(songLists);
    //     // workbook.sheet(0).cell("A1").value('songLists');
    //     workbook.sheet(0).cell("A1").value([
    //       [1, 2, 3],
    //       [4, 5, 6],
    //       [7, 8, 9]
    //     ]);
    //     // const r = workbook.sheet("Sheet1").range('A1');
    //     // r.value([
    //     //   [1, 2, 3],
    //     //   [4, 5, 6],
    //     //   [7, 8, 9]
    //     // ]);
    //     // // Log the value.
    //   });
  },
  // 写入到mongoDB
  outputMongoDB: function name(...data) {
    
  }
       
}
module.exports = outputComment;
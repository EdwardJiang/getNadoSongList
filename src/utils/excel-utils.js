const xlsx = require('node-xlsx');

const excelUtils = {
  /**
   * 新建一个excel
   *
   * @param {string} _path 路径包含文件名
   */
  creat: function createExcel(_path) {

  },
  // 读取一个excel
  read: function readExcel(_path) {
    return xlsx.parse(_path);

  },
  // 写入一个excel
  write: function writeExcel(data, _path) {
    const excelFile = xlsx.readExcel(_path);
    xlsx.build([{ name: "豆子歌单", data: data }], option);
  }

};
module.exports = excelUtils;
const cheerio = require('cheerio');
const getRequest = require('./utils/request-utils');
const statusCode = require('./constant/request-status');
const outputComment = require('./get-comment/get-comment');

const yubaUrl = 'https://yuba.douyu.com/wbapi/web/post/detail/370420361514106498';
let yubaUrlcomment = 'https://yuba.douyu.com/wbapi/web/post/comments/370420361514106498?group_id=458638';
const WAITTIME = 5000;
// 楼主ID
const YuBaUid = 32631686; 
const EXCEL_PATH = './xlsx/豆子歌单.xlsx';
const errorMessage = {
  "NO_Message": '没有返回数据'
};
// 节点
const Node = {
  TEXT_NODE: 3
};


/**
 * 获取鱼吧内容
 *
 * @param {String} result 网页HTML代码
 */
const getYubaContent = function getYubaContent(result) {
  // 返回体
  var responseBody = JSON.parse(result.body);
  // 数据
  const responseData = responseBody.data;

  // { "data": { }, "message": "帖子ID有误", "status_code": 1001 }
  if (responseBody.status_code === 1001) {
    console.log(errorMessage.NO_Message);
    throw new Error(errorMessage.NO_Message);
  }

  // 首条鱼吧信息
  var content = responseData.content;
  getCommonContent(content);
}

/**
 * 从接口返回信息中提取数据
 *
 * @param {*} _content
 * @returns
 */
const getData = function getData(_content) {
  // 获取标题
  $content = cheerio.load(_content);
  let title = $content('b').text();
  let songList = [];
  $content('p').each(function (index, element) {
    // 元素的第一个子节点 是文本节点
    if (element.firstChild.nodeType === Node.TEXT_NODE && element.children.length === 1){
      songList.push(element.firstChild.nodeValue);
    }else if (element.firstChild.nodeType === Node.TEXT_NODE && element.children.length > 1) {
      element.children.forEach(childElement => {
        if(childElement.nodeType === Node.TEXT_NODE){
          songList.push(childElement.nodeValue);
        }
      });
    }
  });
  return {
    title,
    songList
  };
}

/**
 * 遍历数据和输出鱼吧内容，针对特定的鱼吧帖子
 *
 * @param {*} _content
 */
const getCommonContent = function getCommonContent(_content) {
  const data = getData(_content);
  // 输出
  // outputComment['outputConsole'](data);
  // 写入excel
  outputComment['outputExcel'](data, EXCEL_PATH);
}

/**
 * 获取鱼吧回复信息
 *
 * @param {*} content
 */
const getYubaComment = function getYubaComment(content) {
  // 返回体
  var responseBody = JSON.parse(content.body);
  // 数据
  const responseData = responseBody.data;
  const responseCode = responseBody.status_code;
  const currentPage =  responseBody.page;
  const totalPage = responseBody.page_total;

  if (responseCode === statusCode.success) {
    // 循环遍历回复贴
    for (let index = 0; index < responseData.length; index++) {
      const element = responseData[index];

      // 只获取楼主的回复
      if (element.uid === YuBaUid) {
        getCommonContent(element.raw_content);
      } else {
        continue;
      } 
    }
    // 判断是否是最后一页，如果不是继续获取下一页数据，直到最后一页
    if (currentPage < totalPage) {
      let newYubaUrlcomment = yubaUrlcomment + '&page=' + (currentPage + 1);
      getRequest(newYubaUrlcomment, getYubaComment);
    }
  }
}
getRequest(yubaUrl, getYubaContent);
// 5秒后获取回复贴
setTimeout(() => {
  getRequest(yubaUrlcomment + '&page=1', getYubaComment);
}, WAITTIME);
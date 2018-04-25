function GetDateStr(count = 0) {
  let date = new Date();
  date.setDate(date.getDate() + count)
  let month = date.getMonth() + 1
  let day = date.getDate()
  return month + '月' + day + '日'
}
module.exports = {
  // 基础类型输入框配置
  date: {
    list: [{
      id: '1',
      title: GetDateStr()
    }, {
      id: '2',
      title: GetDateStr(1)
    }, {
      id: '3',
      title: GetDateStr(2)
    }, {
      id: '4',
      title: GetDateStr(3)
    }, {
      id: '5',
      title: GetDateStr(4)
    }, {
      id: '6',
      title: GetDateStr(5)
    },
    {
      id: '7',
      title: GetDateStr(6)
    }],
    selectedId: '1',
    scroll: true,
    height: 45
  }
}

function GetDateStr(count = 0) {
  let date = new Date();
  date.setDate(date.getDate() + count)
  let month = date.getMonth() + 1
  let day = date.getDate()
  return month + '月' + day + '日'
}

module.exports = {
  start: {
    title: '开始时间',
    inputType: 'string',
    placeholder: '开始时间 如6:00',
    componentId: 'start',
    right: true,
    error: false
  },
  end: {
    title: '结束时间',
    inputType: 'string',
    placeholder: '结束时间 如6:30',
    componentId: 'end',
    right: true,
    error: false
  },
  date: [
    GetDateStr(),
    GetDateStr(1),
    GetDateStr(2),
    GetDateStr(3),
    GetDateStr(4),
    GetDateStr(5),
    GetDateStr(6)
  ],
  people: [1, 2, 3, 4, 5]
}
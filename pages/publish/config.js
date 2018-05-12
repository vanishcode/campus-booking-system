function GetDateStr(count = 0) {
  let date = new Date();
  date.setDate(date.getDate() + count)
  let month = date.getMonth() + 1
  let day = date.getDate()
  return [month + '月' + day + '日', '2018-0' + month + '-0' + day + 'T']
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
    GetDateStr()[0],
    GetDateStr(1)[0],
    GetDateStr(2)[0],
    GetDateStr(3)[0],
    GetDateStr(4)[0],
    GetDateStr(5)[0],
    GetDateStr(6)[0]
  ],
  people: [5, 10, 15, 20, 25, 30],
  data_date: [
    GetDateStr()[1],
    GetDateStr(1)[1],
    GetDateStr(2)[1],
    GetDateStr(3)[1],
    GetDateStr(4)[1],
    GetDateStr(5)[1],
    GetDateStr(6)[1]
  ]
}
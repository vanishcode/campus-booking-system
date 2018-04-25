const host = require('../../api/api').host
// TODO API


Page({
  data: {
    teacherList: [
      {
        openid: 'jashjhui6yy23hgasf78y',
        avatar: 'https://avatars0.githubusercontent.com/u/20496444?v=4&s=120',
        name: '老王'
      }
    ]
  },
  onLoad(options) {
    let that = this
    wx.showLoading({
      title: '获取数据',
      mask: true
    })
    // 请求数据
    wx.request({
      // 获取老师信息列表
      url: host + options.id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        wx.hideLoading()
        that.setData({
          teacherList: res.data.teacherList
        })
      },
      fail: function () {
        wx.showToast({
          title: '获取信息失败！',
          icon: 'none', 
          duration: 1500,
          mask: true
        })
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      }
    })
  },
  chooseTeacher(e) {
    let targetTeacher = e.currentTarget.dataset.wechat
    wx.navigateTo({
      url: `../target-teacher/target-teacher?target_teacher_wechat=${targetTeacher}`,
    })
  }
})
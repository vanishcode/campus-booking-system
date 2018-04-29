const host = require('../../api/api').host
// TODO API


Page({
  data: {
    teacherList: [
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
      url: host + 'student/collegeTeachers?number='+options.id,
      method: 'GET', 
      success: function (res) {
        wx.hideLoading()
        that.setData({
          teacherList: res.data.data
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
    wx.navigateTo({
      url: `../target-teacher/target-teacher?target_teacher_wechat=${e.currentTarget.dataset.id}
      &target_teacher_name=${e.currentTarget.dataset.name}`,
    })
  }
})
const app = getApp()
const { extend, Tab } = require('../../dist/index');
const config = require('./config')
const host = require('../../api/api').host
const time = require('../../utils/timeTransfer')

Page(extend({}, Tab, {
  data: {
    config,
    now: 0,
    timeList: {},
    teacherID:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.target_teacher_name + '老师'
    })
    let that = this
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    wx.request({
      // 请求某教师发布的信息
      url: host + 'teacher/getInfo?wechatNum=' + options.target_teacher_wechat,// + '?wechat=' + options.target_teacher_wechat,
      method: 'GET',
      success(res) {
        // 标题栏
        that.setData({
          timeList: time(res.data.data,1),
          teacherID:options.target_teacher_wechat
        })
        wx.hideLoading()
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  order(e) {
    let openid = wx.getStorageSync('openid')
    let that = this
    wx.showLoading({
      title: '正在提交',
      mask: true
    })
    wx.request({
      url: host + `student/subscribe?stuWechatNum=${openid}&teaWechatNum=${this.data.teacherID}&id=${e.currentTarget.dataset.id}`,
      method: 'GET',
      data: openid,
      success: function (res) {
        wx.hideLoading()
        // 将信息注入到全局
        //app.globalData.userInfo.subscribe.push(that.data.teacher.getInfo.subscribe[e.currentTarget.dataset.index])
        wx.showToast({
          title: '预约成功',
          icon: 'success', // loading
          duration: 1000,
          mask: true
        })
        wx.switchTab({
          url: '../subscribe/subscribe'
        })
      },
      fail() {
        wx.showToast({
          title: '失败',
          icon: 'none', // loading
          duration: 1000,
          mask: true
        })
      }
    })
  },
  handleZanTabChange(e) {
    // 句柄，监控输入变化
    let componentId = e.componentId;
    let selectedId = e.selectedId
    this.setData({
      [`config.${componentId}.selectedId`]: selectedId,
      now: selectedId - 1
    })
  },
}))

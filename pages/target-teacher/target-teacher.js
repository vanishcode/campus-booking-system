const app = getApp()
const { extend, Tab } = require('../../dist/index');
const config = require('./config')
const host = require('../../api/api').host

Page(extend({}, Tab, {
  data: {
    config,
    now: 0,
    teacher: {}
  },
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    wx.request({
      // 请求某教师发布的信息
      url: host + 'teacher',// + '?wechat=' + options.target_teacher_wechat,
      method: 'GET',
      success(res) {
        // 标题栏
        wx.setNavigationBarTitle({
          title:  '老师'
        })
        that.setData({
          teacher:res.data
        })
        wx.hideLoading()
      },
      fail() {
        wx.setNavigationBarTitle({
          title: '教师'
        })
        wx.hideLoading()
      }
    })
  },
  order(e) {
    let openid = ''
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        openid = res.data
      }
    })
    let that= this
    wx.showLoading({
      title: '正在提交',
      mask: true
    })
    wx.request({
      // 预约此教师的某一时间段
      // 时间为格林尼治标准时间
      url: host + that.data.teacher.getInfo.subscribe[e.currentTarget.dataset.index].id,
      method: 'POST',
      data: openid,
      success: function (res) {
        wx.hideLoading()
        // 将信息注入到全局
        app.globalData.userInfo.subscribe.push(that.data.teacher.getInfo.subscribe[e.currentTarget.dataset.index])
        wx.showToast({
          title: '预约成功',
          icon: 'success', // loading
          duration: 1000,
          mask: true
        })
        wx.navigateTo({
          url: '../subscribe/subscribe',
        })
      },
      fail(){
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

//index.js
//获取应用实例
const app = getApp()
const { extend, Tab } = require('../../dist/index');
const config = require('./config')
const host = require('../../api/api').host

Page(extend({}, Tab, {
  data: {
    now: 0,
    index: 0,
    config,
    showDetails: false,
    nowSelectedDate: 0,
    userInfo: {}
  },
  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  handleZanTabChange(e) {
    // 句柄
    let componentId = e.componentId;
    let selectedId = e.selectedId;
    this.setData({
      [`config.${componentId}.selectedId`]: selectedId,
      now: selectedId - 1
    })
  },

  checkDetails(event) {
    this.setData({
      index: event.currentTarget.dataset.index
    })
    this.toggleCheckDetails()
  },
  cancelOrder(index, teacherOpenid) {
    let openid = ''
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        openid = res.data
      }
    })
    let that = this
    wx.showModal({
      title: '提示',
      content: '你确定要取消吗？',
      success: function (res) {
        // 点击确定
        if (res.confirm) {
          wx.showLoading({
            title: '正在取消...',
            mask: true
          })
          if (userInfo.identity == '学生') {
            let cancelTeacherId = userInfo.subscribe[index].openid
            wx.request({
              // TODO API
              url: host + userInfo.subscribe[index].id,
              method: 'GET',
              success: function (res) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success', // loading
                  duration: 1500,
                  mask: true
                })
                that.setData({
                  'userInfo.subscribe[index]': null
                })
                wx.hideLoading()
              }
            })
          }
          else {
            wx.request({
              // 教师取消自己的时间段，相当于删除
              url: host + userInfo.subscribe[index].id,
              method: 'GET',
              success: function (res) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success', // loading
                  duration: 1500,
                  mask: true
                })
                that.setData({
                  'userInfo.subscribe[index]': null
                })
                wx.hideLoading()
              }
            })
          }
        }
      }
    })
  },
  toggleCheckDetails() {
    this.setData({
      showDetails: !this.data.showDetails
    })
  },
  addOrder() {
    if (app.globalData.userInfo.identity == '学生') {
      // 如果是学生
      wx.navigateTo({
        url: '../institute/institute',
      })
    }
    else {
      // 教师发布
      wx.navigateTo({
        url: '../publish/publish',
      })
    }
  },
}))

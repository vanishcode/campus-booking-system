//index.js
//获取应用实例
const app = getApp()
const { extend, Tab } = require('../../dist/index');
const config = require('./config')
const host = require('../../api/api').host
const timeTransfer = require('../../utils/timeTransfer')

Page(extend({}, Tab, {
  data: {
    now: 0,
    index: 0,
    config,
    showDetails: false,
    nowSelectedDate: 0,
    userInfo: {},
  },
  onShow() {
    this.getUserInfo()
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
  getUserInfo() {
    let that = this
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: host + 'login?wechatNum=' + openid,
      method: 'GET',
      success: function (res) {
        let login_res = res
        if (!res.data.success) {
          wx.hideLoading()
          wx.showModal({
            title: '请先注册',
            content: '点击注册',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../register/register',
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '../register/register',
                })
              }
            }
          })
        }
        else {
          let identity = 'student'
          if (login_res.data.data.identity == 1) identity = 'teacher'
          wx.request({
            url: host + identity + '/getInfo?wechatNum=' + openid,
            method: 'GET',
            success: function (res) {
              Object.assign(app.globalData.userInfo, timeTransfer(res.data.data, login_res.data.data.identity))
              that.setData({
                userInfo: app.globalData.userInfo
              })
            }
          })
        }
      }
    })
  },
  checkDetails(event) {
    this.setData({
      index: event.currentTarget.dataset.index
    })
    this.toggleCheckDetails()
  },
  cancelOrder(e) {
    this.setData({
      index: e.currentTarget.dataset.index
    })
    let openid = wx.getStorageSync('openid')
    let that = this
    let cancelTeacherId = this.data.userInfo.subscribe[this.data.index].id
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
          if (that.data.userInfo.identity == 2) {
            wx.request({
              // TODO API
              url: host + `student/deleteInfo?wechatNum=${openid}&id=${cancelTeacherId}`,
              method: 'GET',
              success: function (res) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success', // loading
                  duration: 1500,
                  mask: true
                })
                that.getUserInfo()
                wx.hideLoading()
              }
            })
          }
          else {
            wx.request({
              // 教师取消自己的时间段，相当于删除
              url: host + `teacher/deleteInfo?wechatNum=${openid}&id=${that.data.userInfo.subscribe[that.data.index].id}`,
              method: 'GET',
              success: function (res) {
                console.log(res)
                
                wx.showToast({
                  title: '取消成功',
                  icon: 'success', // loading
                  duration: 1500,
                  mask: true
                })
                that.getUserInfo()
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
    if (app.globalData.userInfo.identity == 2) {
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

//app.js
const keys = require('./id')
const host = require('./api/api').host
App({
  onLaunch() {
    let that = this
    wx.showLoading({
      title: '获取数据',
      mask: true
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.getUserInfo(res.data)
      },
      fail: function () {
        wx.login({
          success: res => {
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=${keys.id}&secret=${keys.secret}&js_code=${res.code}&grant_type=authorization_code`,
              method: 'GET',
              success: function (res) {
                wx.setStorage({
                  key: "openid",
                  data: res.data.openid
                })
                that.getUserInfo(res.data.openid)
              }
            })
          }
        })
      }
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  that.globalData.wechatInfo = res.userInfo
                  wx.hideLoading()
                }
              })
            }
          })
        }
        else {
          wx.getUserInfo({
            success: res => {
              that.globalData.wechatInfo = res.userInfo
              wx.hideLoading()
            }
          })
        }
      }
    })
  },
  getUserInfo(openid) {
    let that = this
    // 获取预约等信息
    wx.request({
      url: host + 'signup?openid=' + openid,
      method: 'GET',
      success: function (res) {
        // 与上面不一样，请勿混淆
        wx.hideLoading()
        that.globalData.userInfo = res.data

      },
      fail: function (res) {
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
    })
  },
  globalData: {
    // 微信相关信息 包括微信名，头像地址
    wechatInfo: {},
    // 个人信息，预约，身份，姓名，号码，手机，剩余时间
    userInfo: {}
  }
})
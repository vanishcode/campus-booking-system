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
      fail: function () {
        wx.login({
          success: res => {
            console.log(res)
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=${keys.id}&secret=${keys.secret}&js_code=${res.code}&grant_type=authorization_code`,
              method: 'GET',
              success: function (res) { 
                wx.setStorage({
                  key: "openid",
                  data: res.data.openid
                })
                // that.getUserInfo(res.data.openid)
              }
            })
          }
        })
      }
    })

    wx.getSetting({
      success(res) {
        console.log(res)
        
        wx.hideLoading()
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                withCredentials:false,
                success: res => {
                  console.log(res)
                  
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

  globalData: {
    // 微信相关信息 包括微信名，头像地址
    wechatInfo: {},
    // 个人信息，预约，身份，姓名，号码，手机，剩余时间
    userInfo: {}
  }
})
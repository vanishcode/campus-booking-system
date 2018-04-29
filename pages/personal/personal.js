const host = require('../../api/api').host

const app = getApp()
Page({
  data: {
    userInfo:{},
    wechatInfo:{}
  },
  onShow(){
    let that = this
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: host+'personal/get?wechatNum='+openid,
      method: 'GET', 
      success: function(res){
        
        Object.assign(app.globalData.userInfo,res.data.data)
        that.setData({
          userInfo: app.globalData.userInfo,
          wechatInfo:app.globalData.wechatInfo
        })
      }
    })
  },

  updateInfo(){
    wx.navigateTo({
      url: '../update-personal-info/update-personal-info',
    })
  }
})
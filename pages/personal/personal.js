// pages/personal/personal.js
const app = getApp()
Page({

  data: {
    userInfo:{},
    wechatInfo:{}
  },
  onShow(){
    this.setData({
      userInfo: app.globalData.userInfo,
      wechatInfo:app.globalData.wechatInfo
    })
  },

  updateInfo(){
    wx.navigateTo({
      url: '../update-personal-info/update-personal-info',
    })
  }
})
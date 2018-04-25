// pages/institute/institute.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  chooseId(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '../teachers/teachers?id=' + e.currentTarget.dataset.id,
      })
    }
  }
})
const Zan = require('../../dist/index');
const config = require('./config');
const app = getApp()
const host = require('../../api/api').host

Page(Object.assign({}, Zan.Field, {
  data: {
    config,
    name: '',
    number: '',
    phone: ''
  },
  onShow() {
    if (app.globalData.userInfo.identity == 1) {
      this.setData({
        'config.number.title': '工号',
        'config.number.placeholder': '请输入工号'
      })
    }
    this.setData({
      name: app.globalData.userInfo.name,
      number: app.globalData.userInfo.number,
      phone: app.globalData.userInfo.tel
    })
  },
  handleZanFieldChange(e) {
    const { componentId, detail } = e

    this.setData({
      [`${componentId}`]: detail.value
    })
  },
  validateForm() {
    // TODO
  },
  cancelEdit() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  submitEdit() {
    let openid = wx.getStorageSync('openid')
    let that = this
    let name = encodeURIComponent(this.data.name)
    if (this.data) {
      // 表单验证
      // 修改
      //  艹
    }
    wx.showLoading({
      title: '正在提交',
    })
    wx.request({
      url: host + `personal/change?wechatNum=${openid}&name=${name}&number=${that.data.number}
      &tel=${that.data.phone}&identity=${app.globalData.userInfo.identity}&college=${app.globalData.userInfo.college}`,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '成功',
          icon: 'success', // loading
          duration: 1500,
          mask: true
        })
        setTimeout(() => {
          wx.switchTab({ url: '../personal/personal' })
        }, 1500);
      }
    })
  }
}));

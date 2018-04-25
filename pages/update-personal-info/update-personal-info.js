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
    if (app.globalData.userInfo.identity !== '教师') {
      this.setData({
        'config.number.title': '工号',
        'config.number.placeholder': '请输入工号'
      })
    }
    this.setData({
      name: app.globalData.userInfo.name,
      number: app.globalData.userInfo.number,
      phone: app.globalData.userInfo.phone
    })
  },
  handleZanFieldChange(e) {
    const { componentId, detail } = e

    this.setData({
      [`${componentId}`]: detail.value
    })
  },
  validateForm() {

  },
  cancelEdit() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  submitEdit() {
    let openid = ''
    // 获取ID
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        openid = res.data
      }
    })
    if (this.data) {
      // 表单验证
      // 修改
      //  艹
    }
    wx.showLoading({
      title: '正在提交',
    })
    wx.request({
      url: host,
      data: {
        "openid": openid,
        "name": this.data.name,
        "number": this.data.number,
        "phone": this.data.phone
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        //   wx.hideLoading()
        wx.showToast({
          title: '成功',
          icon: 'success', // loading
          duration: 1500,
          mask: true
        })
      }
    })
  }
}));

const Zan = require('../../dist/index');
const config = require('./config');
const app = getApp()
const host = require('../../api/api').host

Page(Object.assign({}, Zan.Field, {
  data: {
    config,
    name: '',
    number: '',
    phone: '',
  },
  onIdentityChange(e) {
    let id = e.detail.value == 0 ? '学号' : '工号'
    this.setData({
      'config.identityIndex': e.detail.value,
      'config.number.title': id,
      'config.number.placeholder': `请输入${id}`
    })
  },
  validateForm() {
    let phoneRe = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!phoneRe.test(this.data.phone)) {
      this.setData({
        'config.phone.error': true
      })
      return false
    }
    else {
      this.setData({
        'config.phone.error': false
      })
      return true
    }
  },
  clearInput() {
    this.setData({
      name: '',
      number: '',
      phone: '',
    })
  },
  submitInfo() {
    if (this.validateForm()) {
      let openid = ''
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          openid = res.data
        }
      })
      let identity = '学生'
      if (this.data.config.identityIndex == 1) identity = '教师'
      let userInfo = {
        identity: identity,
        name: this.data.name,
        number: this.data.number,
        phone: this.data.phone,
        openid: openid
      }
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: host + 'signin',
        data: userInfo,
        method: 'POST',
        success: function (res) {
          app.globalData.userInfo = userInfo
          wx.hideLoading()
          wx.showToast({
            title: '注册成功!',
            icon: 'success',
            duration: 1500,
            mask: true
          })
          wx.redirectTo({
            url: '../subscribe/subscribe'
          })
        }
      })
    }
    else {
      wx.showModal({
        title: '错误',
        content: '不合法的输入!'
      })
    }
  },
  handleZanFieldChange(e) {
    const { componentId, detail } = e
    this.setData({
      [`${componentId}`]: detail.value
    })
    this.validateForm()
  }
}))

// pages/publish/publish.js
const app = getApp()
const config = require('./config')
const Zan = require('../../dist/index')
const host = require('../../api/api').host

Page(Object.assign({}, Zan.Field,{

  /**
   * 页面的初始数据
   */
  data: {
    config,
    dateIndex: 0,
    peopleIndex: 0,
    start:'',
    end: '',
    openid:''
  },

  onShow: function (options) {
    let that = this
    wx.getStorage({
      key: 'openid',
      success: function(res){
        that.setData({
          openid:res.data
        })
      }
    })
  },
handleZanFieldChange(e) {
    const { componentId, detail } = e
    this.setData({
      [`${componentId}`]: detail.value
    })
    this.validateForm()
  },
  onDateChange(e) {
    this.setData({
      dateIndex: e.detail.value
    })
  },
  validateForm(){
    console.log('ll')
    
  },
  onPeopleChange(e) {
    this.setData({
      peopleIndex: e.detail.value
    })
  },
  publishInfo(){
    // TODO
    let publishInfo = {
      openid:this.data.openid,
      date:this.data.config.date[this.data.dateIndex],
      start:this.data.start,
      end:this.data.end,
      people:this.data.config.people[this.data.peopleIndex]
    }
    wx.showLoading({
      title: '正在发布',
      mask: true
    })
    wx.request({
      // TODO API
      url: host,
      data: publishInfo,
      method: 'POST',
      success: function(res){
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1500,
          mask: true
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  cancelPublish(){
    wx.navigateBack({
      delta: 1, 
    })
  }
}))
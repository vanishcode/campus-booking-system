// pages/publish/publish.js
const app = getApp()
const config = require('./config')
const Zan = require('../../dist/index')
const host = require('../../api/api').host

Page(Object.assign({}, Zan.Field, {

  data: {
    config,
    dateIndex: 0,
    peopleIndex: 0,
    start: '',
    end: '',
    openid: ''
  },

  onShow: function (options) {
    let that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      }
    })
  },
  handleZanFieldChange(e) {
    const { componentId, detail } = e
    this.setData({
      [`${componentId}`]: detail.value
    })
  },
  onDateChange(e) {
    this.setData({
      dateIndex: e.detail.value
    })
  },
  onPeopleChange(e) {
    this.setData({
      peopleIndex: e.detail.value
    })
  },
  publishInfo() {
    if(this.data.start==''||this.data.end==''){
      wx.showModal({
        title: '错误',
        content: '请检查输入',
        success: function (res) {
        }
      })
      return false
    }
    else{
      if (this.data.start.length == 4) {
        this.setData({
          start: '0' + this.data.start
        })
      }
      if (this.data.end.length == 4) {
        this.setData({
          end: '0' + this.data.end
        })
      }
      let publishInfo = {
        openid: this.data.openid,
        start: this.data.config.data_date[this.data.dateIndex] + this.data.start + ':00.839Z',
        end: this.data.config.data_date[this.data.dateIndex] + this.data.end + ':00.839Z',
        range: this.data.config.people[this.data.peopleIndex]
      }
      wx.showLoading({
        title: '正在发布',
        mask: true
      })
      wx.request({
        // TODO API
        url: host + `teacher/releaseInfo?wechatNum=${publishInfo.openid}&startTime=${publishInfo.start}&endTime=${publishInfo.end}&range=${publishInfo.range}`,
        method: 'GET',
        success: function (res) {
          console.log(res)
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
    }
  
  },
  cancelPublish() {
    wx.navigateBack({
      delta: 1,
    })
  }
}))
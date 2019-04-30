//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
let interval = null

Page({
  data: {
    isZiBi: false,
    zibiTime: '',
    oldTime: '',
    ziBiText:'开启自闭模式'
  },

  onLoad(){
    let zibiTimeStorage = wx.getStorageSync('zibiTime')
    if(zibiTimeStorage){
      this.setData({
        oldTime: zibiTimeStorage,
        isZiBi:true,
        ziBiText:'自闭中...'
      })
      this.goCount()
    }
  },

  // 切换信道的按钮
  switchChange: function(e) {
    var checked = e.detail.value
    this.setData({
      isZiBi: checked,
      ziBiText: checked ? '我自闭了':'开启自闭模式',
    })
    if (checked) {
      this.openZibi()
      return
    }
    this.closeZibi()
  },

  openZibi() {
    let time = new Date().getTime()
    console.log(time)
    wx.setStorageSync("zibiTime", time)
    this.setData({
      oldTime: time
    })
    this.goCount()
  },

  closeZibi() {
    wx.removeStorageSync('zibiTime')
    console.log("本次自闭时间："+this.data.zibiTime)
    //todo:弹窗，高知时间，配图
    this.cleanIntervalAll()
    this.setData({
      zibiTime:"00-00-00 00:00:00",
    })
  },

  goCount() {
    var that = this;
    interval = setInterval(() => {
      let zibiTime = util.countDate(that.data.oldTime)
      that.setData({
        zibiTime,
      })
    }, 1000)
  },

  cleanIntervalAll() {
    if (!interval) {
      return
    }
    clearInterval(interval)
    interval = null
  }
})
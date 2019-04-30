const formatTime = () => {
  let date = new Date
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const countDate = (oldDate) => {
  let newDate = new Date().getTime();
  let str = newDate - oldDate;
  var oDate = new Date(str);

  let year = oDate.getFullYear() - 1970;
  let  month = oDate.getMonth(); 
  let  day = oDate.getDate() - 1;
  let hour = oDate.getHours() - 8;   
  let minute = oDate.getMinutes();   
  let second = oDate.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function downCount(a, b) {
  if (a - b >= 0) {
    return a - b
  }
  return 60 - parseInt(b) + parseInt(a)
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}
module.exports = {
  formatTime,
  countDate,
  showBusy,
  showSuccess,
  showModel
}
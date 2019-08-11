// pages/order/date/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workerid: 0,
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    dateArray: '',
    isCheck: 0,
    startDate: '',
    endDate: '',
    clickDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.type){
      that.setData({
        type: options.type
      })
    }
    if (options.startDate) {
      that.setData({
        startDate: options.startDate
      })
      if (options.type==0){
        that.setData({
          clickDate: options.startDate
        })
      }
    }
    if (options.endDate) {
      that.setData({
        endDate: options.endDate
      })
      if (options.type == 1) {
        that.setData({
          clickDate: options.endDate
        })
      }
    }
    wx.setNavigationBarTitle({
      title: that.data.type == 1 ? '选择离店日期' : '选择入住日期'
    });
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let isM = month > 9 ? month : '0' + month;
    let isD = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    that.setData({
      year: year,
      month: month,
      isToday: '' + year + isM + isD
    })
    that.dateInit();
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year, month, 1).getDay();							//目标月1号对应的星期

    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        let m = (month + 1)>9 ? (month + 1) : '0' + (month + 1)
        let d = num > 9 ? num : '0' + num;
        let week = i%7;
        obj = {
          isToday: '' + year + m + d,
          dateNum: num,
          week: week,
          weight: 5
        }
        obj.check = this.data.dateArray.search(obj.isToday) != '-1';
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },

  cilck: function (e) {
    var newDate = e.currentTarget.dataset.date;
    var week = e.currentTarget.dataset.week;
    this.setData({
      clickDate: newDate,
      weekIndex: week
    })
    this.data.type == 1 ? (this.setData({ endDate: newDate })) : (this.setData({ startDate: newDate }))
    if (this.data.startDate && this.data.endDate) {
      this.dateDiff(this.data.startDate, this.data.endDate);
    }
  },
  dateDiff: function (sDate1, sDate2) {
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("")
    oDate1 = new Date(aDate[4] + aDate[5] + '-' + aDate[6] + aDate[7] + '-' + aDate[0] + aDate[1] + aDate[2] + aDate[3])    //转换为12-18-2006格式
    aDate = sDate2.split("")
    oDate2 = new Date(aDate[4] + aDate[5] + '-' + aDate[6] + aDate[7] + '-' + aDate[0] + aDate[1] + aDate[2] + aDate[3])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
    this.setData({
      num: iDays
    })
  },
  submit:function(){
    if (!this.data.clickDate){
      wx.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    var that = this;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let clickArray = that.data.clickDate.split('');
    var date = clickArray[4] + clickArray[5] + '月' + clickArray[6] + clickArray[7] + '日';
    var week = '周' + that.data.date[that.data.weekIndex];
    var clickData = {
      value: that.data.clickDate,
      date: date,
      week: week
    }
    prevPage.setData({
      type: that.data.type,
      click_data: clickData
    })
    wx.navigateBack({
      delta: 1
    })
  },
  cancel: function () {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.startDate && this.data.endDate) {
      this.dateDiff(this.data.startDate, this.data.endDate);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
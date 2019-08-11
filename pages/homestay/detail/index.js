// pages/homestay/detail/index.js
var app = getApp(), core = app.requirejs("core"), wxParse = app.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot,
    roomList: [],
    tabIndex: 1,
    num: 0,
    startDate: '',
    endDate: ''
  },

  choiceTab: function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      tabIndex: index
    })
  },

  //选择日期
  choiceDate: function(e){
    var value = e.currentTarget.dataset;
    if (value.type == 1){
      if (!this.data.startDate){
        wx.showToast({
          title: '请先选择入住日期',
          icon: 'none',
          duration: 1000
        })
        return false
      }
    }
    var startDate = '', endDate = '';
    if (this.data.startDate){
      startDate = '&startDate='+this.data.startDate.value
    }
    if (this.data.endDate) {
      endDate = '&endDate=' +this.data.endDate.value
    }
    wx.navigateTo({
      url: '../date/index?type=' + value.type + startDate + endDate, 
    })
  },

  //预订下单
  create: function (e){
    var id = e.currentTarget.dataset.id;
    if (!this.data.startDate) {
      wx.showToast({
        title: '请先选择入住日期',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    if (!this.data.endDate) {
      wx.showToast({
        title: '请先选择离店日期',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    wx.navigateTo({
      url: '../create/index?id=' + id + '&start=' + this.data.startDate.value + '&end=' + this.data.endDate.value,
    })
  },

  getDetail: function () {
    var t = this, a = t.data.id;
    core.get("homestay/get_detail", {
      id: a,
      lat: t.data.mypos.lat,
      lng: t.data.mypos.lng
    }, function (e) {
      var a = {};
      t.setData({
        show: !0
      })
      if (e.error != 0) {
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 1000
        }), setTimeout(function () {
          wx.navigateBack();
        }, 500)
        return
      }
      if (e.detail) {
        wx.setNavigationBarTitle({
          title: e.detail.name
        });
        a.detail = e.detail;
        wxParse.wxParse("wxParseData", "html", a.detail.content, t, "0");
      }
      t.setData(a), t.getRoomList();
    });
  },

  getRoomList: function () {
    var t = this;
    core.get("homestay/get_RoomList", {
      id: t.data.id
    }, function (e) {
      var a = {};
      a.roomList = e.list;
      t.setData(a);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var i = this;
    i.setData({
      id: Number(options.id)
    });
    var s = app.getCache("mypos");
    s ? (i.setData({
      mypos: s
    }), i.getDetail()) : wx.getLocation({
      type: "wgs84",
      success: function (a) {
        app.setCache("mypos", {
          lat: a.latitude,
          lng: a.longitude,
          speed: a.speed,
          accuracy: a.accuracy
        }, 7200), i.setData({
          mypos: {
            lat: a.latitude,
            lng: a.longitude,
            speed: a.speed,
            accuracy: a.accuracy
          }
          }), i.getDetail()
      },
      fail: function (t) {
        a.alert("取消位置信息将无法定位到民宿距离！"), i.setData({
          mypos: {
            lat: "",
            lng: ""
          }
        }), i.getDetail()
      }
    })
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
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    if (currPage.data.click_data) {
      var i = currPage.data.type == 1 ? 'endDate' : 'startDate' ;
      if (that.data[i] && currPage.data.click_data.value == that.data[i].value){
        
      }else{
        that.setData({
          [i]: currPage.data.click_data
        }) 
      }
    }
    if (that.data.startDate && that.data.endDate){
      that.dateDiff(that.data.startDate.value, that.data.endDate.value);
    }
  },

  dateDiff: function (sDate1, sDate2){
    var  aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("")
    oDate1 = new Date(aDate[4] + aDate[5] + '-' + aDate[6] + aDate[7] + '-' + aDate[0] + aDate[1] + aDate[2] + aDate[3])    //转换为12-18-2006格式
    aDate  =  sDate2.split("")
    oDate2 = new Date(aDate[4] + aDate[5] + '-' + aDate[6] + aDate[7] + '-' + aDate[0] + aDate[1] + aDate[2] + aDate[3])
    iDays  =  parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)   
    this.setData({
      num: iDays
    })
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
// pages/maker/buylog/index.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot,
    page: 1,
    list: [],
    days: '0'
  },

  getList: function () {
    var that = this;
    that.setData({
      loaded: !0
    })
    core.get("maker/buy_log", { page: that.data.page, date: that.data.date }, function (e) {
      if (0 == e.error) {
        that.setData({
          loaded: !1,
          show: !0,
          total: e.total,
          days: e.days
        })
        if (e.total == 0) {
          that.setData({
            empty: !0
          })
        }
        if (e.list.length > 0) {
          that.setData({
            page: that.data.page + 1,
            list: that.data.list.concat(e.list)
          })
        }
      } else {
        wx.showToast({
          title: e.message,
          icon: 'none'
        })
      }
    });
  },
  bindDateChange: function (e) {
    var time = e.detail.value;
    var timearr = time.split("-");
    var newtime = timearr[0] + '年' + timearr[1] + '月';
    this.setData({
      date: newtime,
    })
    this.setData({ page: 1, list: [], loaded: !0, empty: !1 }), this.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    var Y = myDate.getFullYear();
    var M = (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1);
    var date = Y + '年' + M + '月';
    this.setData({
      date: date
    })
    this.getList();
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
    this.data.loaded || this.getList();
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
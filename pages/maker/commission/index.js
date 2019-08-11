// pages/maker/commission/index.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot,
    commission_total: 0,
    page: 1,
    list: [],
    isChecked: true
  },

  getList: function () {
    var that = this;
    that.setData({
      loaded: !0
    })
    var i = {
      page: that.data.page, 
      date: that.data.date
    }
    if (!that.data.isChecked){
      i.type = 1;
    }
    core.get("maker/getEarnings", i, function (e) {
      if (0 == e.error) {
        that.setData({
          loaded: !1,
          show: !0,
          total: e.total,
          commission_total: e.commission_total
        })
        if (e.total == 0 || !e.total) {
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

  getInfo: function () {
    var that = this;
    core.get("villager", {}, function (res) {
      that.setData({
        show: !0,
        memberInfo: res.member
      })
    });
  },
  bindDateChange: function (e) {
    var time = e.detail.value;
    var timearr = time.split("-");
    var newtime = timearr[0] + '年' + timearr[1] + '月';
    this.setData({
      date: newtime
    })
    this.setData({ page: 1, list: [], loaded: !0, empty: !1 }), this.getList();
  },
  incometypechange: function (e) {
    this.setData({
      isChecked: false
    })
    this.setData({ page: 1, list: [], loaded: !0, empty: !1 }), this.getList();
  },
  uncometypechange: function (e) {
    this.setData({
      isChecked: true
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
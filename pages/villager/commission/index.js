// pages/villager/commission/index.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot,
    commission_total: 0,
    page: 1,
    list: []
  },

  getList: function () {
    var that = this;
    that.setData({
      loaded: !0
    })
    core.get("villager/commission/get_List", { page: that.data.page, date: that.data.date }, function (e) {
      if (0 == e.error) {
        that.setData({
          loaded: !1,
          show: !0,
          total: e.total,
          commission_total: e.commission_total
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
        a.toast(e.message, "loading");
      }
    });
  },

  bindDateChange: function (e) {
    var str = e.detail.value.split('');
    var date = str[0] + str[1] + str[2] + str[3] + '年' + str[5] + str[6] + '月';
    this.setData({
      date: date
    })
    this.setData({ page: 1, list: [], loaded: !0, empty: !1}),this.getList();
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
    this.data.loaded || this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
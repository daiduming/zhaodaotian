// pages/maker/village/index.js
var app = getApp(), core = app.requirejs("core"), a = app.requirejs("foxui"), i = app.requirejs("jquery");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot,
    list: []
  },
  getInfo: function () {
    var that = this;
    core.get("maker/have_villageList", {}, function (e) {
      that.setData({
        show: !0,
        total: e.total,
        list: e.list
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
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
// pages/travels/list.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: [],
    imgUrl: app.globalData.approot
  },

  getList: function () {
    var t = this;
    t.setData({
      loaded: !0
    })
    core.get("travels/get_list", { page: t.data.page, isrecommand: t.data.isrecommand }, function (e) {
      t.setData({
        loaded: !1,
        total: e.total,
        show: !0
      });
      if (e.list.length>0){
        t.setData({
          page: t.data.page + 1,
          list: t.data.list.concat(e.list)
        })
      }
      if (e.total == 0) {
        t.setData({
          empty: !0
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isrecommand: options.isrecommand
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
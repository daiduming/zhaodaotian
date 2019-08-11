// pages/village/article/index.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    imgUrl: app.globalData.approot,
    list: []
  },
  getList: function () {
    var that = this;
    that.setData({
      loaded: !0
    })
    core.get("village/article/get_List", { id: that.data.id, page: that.data.page }, function (e) {
      if (0 == e.error) {
        that.setData({
          loaded: !1,
          show: !0,
          total: e.total
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: Number(options.id)
    }),that.getList();
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
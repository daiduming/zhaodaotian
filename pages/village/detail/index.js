// pages/village/detail/index.js
var app = getApp(), core = app.requirejs("core"), wxParse = app.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot
  },

  getDetail: function () {
    var t = this, a = t.data.id;
    core.get("village/get_detail", {
      id: a
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
          title: e.detail.title
        });
        a.detail = e.detail;
        a.isapply = e.isapply;
        wxParse.wxParse("wxParseData", "html", a.detail.content, t, "0");
      }
      t.setData(a);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: Number(options.id)
    }), this.getDetail();
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
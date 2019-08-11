// pages/maker/village/list.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    imgUrl: app.globalData.approot,
    list: [],
    region: ['省', '市', '区'],
    customItem: '全部'
  },

  formSubmit: function (e) {
    console.log(e);
    this.setData({
      keyword: e.detail.value.keyword,
      list: [],
      page: 1
    })
    this.getList();
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      list: [],
      page: 1
    })
    this.getList();
  },

  getList: function () {
    var that = this;
    that.setData({
      loaded: !0
    })
    var i = {
      page: that.data.page
    }
    if (that.data.keyword) {
      i.keyword = that.data.keyword;
    }
    if (that.data.region[0] != '省' && that.data.region[0] != '全部') {
      i.province = that.data.region[0];
    }
    if (that.data.region[1] != '市' && that.data.region[1] != '全部') {
      i.city = that.data.region[1];
    }
    if (that.data.region[2] != '区' && that.data.region[2] != '全部') {
      i.area = that.data.region[2];
    }
    core.get("village/get_List", i, function (e) {
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
    that.getList();
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
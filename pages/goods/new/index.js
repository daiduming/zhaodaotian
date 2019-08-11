// pages/goods/new/index.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    imgUrl: app.globalData.approot,
    swiperCurrent: 0,
    keywords: '',
    imgUrls: [],
    recommendList: [],
    categoryList: [],
    cateCurrent: '',
    list: []
  },

  getBanner: function () {
    var that = this;
    core.get("", {}, function (e) {
      console.log(e);
      that.setData({
        imgUrls: e.list
      });
    });
  },

  swiperCurrent: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  getRecommend: function () {
    var that = this;
    var data = {
      pagesize: 4,
      isrecommand: 1
    }
    core.get("goods/get_list", data, function (e) {
      console.log(e);
      that.setData({
        recommendList: e.list
      });
    });
  },

  getCategory: function () {
    var that = this;
    core.get("goods/get_category", {}, function (e) {
      console.log(e);
      that.setData({
        categoryList: e.allcategory.parent,
        cateCurrent: e.allcategory.parent[0].id
      });
      that.getList();
    });
  },

  selected: function (t) {
    console.log(t);
    var id = t.currentTarget.dataset.index;
    this.setData({
      cateCurrent: id,
      list: [],
      page: 1,
      empty: !1
    }), this.getList();
  },

  getList: function () {
    var that = this;
    that.setData({
      loaded: !0
    })
    var data = {
      cate: that.data.cateCurrent,
      pagesize: 10,
      page: that.data.page,
      keywords: that.data.keywords
    }
    core.get("goods/get_list", data, function (e) {
      console.log(e);
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
    that.getBanner();
    that.getRecommend();
    that.getCategory();
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
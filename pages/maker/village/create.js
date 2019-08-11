// pages/maker/village/create.js
var app = getApp(), core = app.requirejs("core"), a = app.requirejs("foxui"), i = app.requirejs("jquery");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 1,
    imgUrl: app.globalData.approot,
    multiple: 1
  },
  getDetail: function () {
    var t = this, a = t.data.id;
    core.get("maker/get_create", {
      id: a
    }, function (e) {
      var a = {};
      t.setData({
        show: !0
      })
      if (e.error != 0 || !e.detail) {
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
        a.detail = e.detail;
        a.multiple = e.detail.multiple;
        a.number = a.multiple;
      }
      t.setData(a);
    });
  },
  add: function () {
    var _this = this;
    var currentnum = _this.data.number;
    _this.setData({
      number: currentnum + Number(_this.data.multiple)
    })
  },
  reduce: function () {
    var _this = this;
    var currentnum = _this.data.number;
    if (currentnum > Number(_this.data.multiple)) {
      _this.setData({
        number: currentnum - Number(_this.data.multiple)
      })
    }
  },
  watchInput: function (event) {
    var _this = this;
    var currentnum = Number(event.detail.value);
    var multiple = Number(_this.data.multiple);
    _this.setData({
      number: currentnum - (currentnum % multiple)
    })
  },
  submit: function () {
    var _this = this;
    var total = _this.data.number;
    var price = total * _this.data.detail.price;
    if (total > 0) {
      core.post("maker/create", { id: _this.data.id ,total: total, price: price }, function (e) {
        if (0 != e.error) {
          wx.showToast({
            title: e.message,
            icon: 'none',
            duration: 1000
          });
          return
        } else {
          wx.redirectTo({
            url: "/pages/maker/pay/index?id=" + e.orderid
          })
        }
      });
    }
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
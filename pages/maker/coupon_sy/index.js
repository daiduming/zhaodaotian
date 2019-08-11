// pages/maker/coupon_sy/index.js
var app = getApp(), core = app.requirejs("core"), a = app.requirejs("foxui"), i = app.requirejs("jquery");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 0,
    money: 0,
    voucher: 0,
    imgUrl: app.globalData.approot
  },
  getInfo: function () {
    var that = this;
    core.get("maker/coupon_sy", {}, function (e) {
      that.setData({
        loaded: !1,
        show: !0,
        voucher: e.total,
        list: e.list
      })
    });
  },
  add: function () {
    var _this = this;
    var currentnum = _this.data.number;
    var voucher = _this.data.voucher;
    if (currentnum < voucher){
      _this.setData({
        number: currentnum + 1
      })
      _this.getValue();
    }
  },
  reduce: function () {
    var _this = this;
    var currentnum = _this.data.number;
    if (currentnum > 0) {
      _this.setData({
        number: currentnum - 1
      })
      _this.getValue();
    }
  },
  watchInput: function (event) {
    var _this = this;
    var currentnum = Number(event.detail.value);
    var voucher = _this.data.voucher;
    if (currentnum > voucher) {
      currentnum = voucher;
    }
    _this.setData({
      number: currentnum
    })
    _this.getValue();
  },
  getValue: function (){
    var _this = this;
    if (_this.data.number==0){
      _this.setData({
        money: 0
      })
      return
    }
    var couponids = [];
    var money = 0;
    for(var i=0; i < this.data.number; i++){
      couponids[i] = _this.data.list[i].id;
      money = Number(money) + Number(_this.data.list[i].amount);
    }
    _this.setData({
      couponids: couponids,
      money: money
    })
  },
  submit: function(){
    var _this = this;
    if (_this.data.number > 0){
      core.post("maker/coupon_sy_use", { couponids: _this.data.couponids, money: _this.data.money}, function (e) {
        if (e.errno == 0) {
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 1000
          }), _this.setData({ number: 0, money: 0, couponids: [], loaded:!0}),_this.onLoad();
        } else {
          wx.showToast({
            title: e.message,
            icon: 'none',
            duration: 1000
          })
        }  
      });
    }
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
// pages/activity/create/index.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getDetail: function () {
    var t = this, a = t.data.id;
    core.get("activity/get_detail", {
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
        if(!e.isapply){
          wx.showToast({
            title: '不在报名时间内',
            icon: 'none',
            duration: 1000
          }), setTimeout(function () {
            wx.navigateBack();
          }, 500)
          return
        }
      }
      t.setData(a);
    });
  },

  submit: function () {
    var i = this;
    var r = {
      id: i.data.id,
      realname: i.data.realname,
      mobile: i.data.mobile,
      remark: i.data.remark
    };
    if (!r.realname || !r.mobile) {
      wx.showToast({
        title: '姓名和手机号不能为空',
        icon: 'none',
        duration: 1000
      });
      return
    }
    core.post("activity/create", r, function (s) {
      if (0 != s.error){
        wx.showToast({
          title: s.message,
          icon: 'none',
          duration: 1000
        });
        return
      }else{ 
        wx.redirectTo({
          url: "/pages/activity/pay/index?id=" + s.orderid
        })
      }
    })
  },
  onChange: function (t) {
    var e = this;
    var i = t.currentTarget.dataset.type;
    var v = t.detail.value;
    e.setData({
      [i]: v
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
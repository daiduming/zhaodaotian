// pages/maker/pay/index.js
var t = getApp(), e = t.requirejs("core"), o = t.requirejs("foxui");

Page({
  data: {
    icons: t.requirejs("icons"),
    success: !1,
    successData: {},
    coupon: !1
  },
  onLoad: function (e) {
    this.setData({
      options: e,
      imgUrl: t.globalData.approot
    }), t.url(e);
  },
  onShow: function () {
    this.get_list();
  },
  get_list: function () {
    var t = this;
    e.get("maker/pay", t.data.options, function (o) {
      if (0 != o.error){
        t.setData({
          show: !0
        })
        wx.showToast({
          title: o.message,
          icon: 'none',
          duration: 1000
        }), setTimeout(function () {
          wx.navigateBack();
        }, 500)
        return
      }
      50018 != o.error ? (!o.wechat.success && "0.00" != o.order.price && o.wechat.payinfo && e.alert(o.wechat.payinfo.message + "\n不能使用微信支付!"),
        t.setData({
          list: o,
          show: !0
        })) : '';
    });
  },
  pay: function (t) {
    var a = this, s = e.pdata(t).type, a = this, i = this.data.list.wechat;
    e.post("maker/pay/checkstock", {
      id: a.data.options.id
    }, function (t) {
      0 == t.error ? "wechat" == s ? e.pay(i.payinfo, function (t) {
        "requestPayment:ok" == t.errMsg && a.complete(s);
      }) : "credit" == s ? e.confirm("确认要支付吗?", function () {
        a.complete(s);
      }, function () { }) : a.complete(s) : o.toast(a, t.message);
    }, !0, !0);
  },
  complete: function (t) {
    var a = this;
    e.post("maker/pay/complete", {
      id: a.data.options.id,
      type: t
    }, function (t) {
      if (0 != t.error) o.toast(a, t.message); else {
        wx.setNavigationBarTitle({
          title: "支付成功"
        });
        var e = Array.isArray(t.ordervirtual);
        a.setData({
          success: !0,
          successData: t,
          order: t.order,
          ordervirtual: t.ordervirtual,
          ordervirtualtype: e
        });
      }
    }, !0, !0);
  },
  shop: function (t) {
    0 == e.pdata(t).id ? this.setData({
      shop: 1
    }) : this.setData({
      shop: 0
    });
  },
  phone: function (t) {
    e.phone(t);
  },
  closecoupon: function () {
    this.setData({
      coupon: !1
    });
  }
});
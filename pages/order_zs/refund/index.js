var t = getApp(), e = t.requirejs("core"), a = t.requirejs("biz/order_zs");

Page({
    data: {
        code: 1,
        tempFilePaths: "",
        delete: "",
        reasonArr: [ "不住了" ],
        reasonIndex: 0,
        images: []
    },
    onLoad: function(e) {
        this.setData({
            options: e
        }), t.url(e), this.get_list();
    },
    get_list: function() {
        var t = this;
        e.get("order_zs/refund", t.data.options, function(a) {
            t.setData({
                show: !0
            }), 0 == a.error ? (a.order.status < 2 && (a.rtypeArr = [ "退款" ]), t.setData(a)) : (e.toast(a.message, "loading"), 
            setTimeout(function() {
                wx.navigateBack();
            }, 1500));
        });
    },
    submit: function() {
        var t = {
            id: this.data.options.id,
            reason: this.data.reasonArr[this.data.reasonIndex],
            content: this.data.content,
            price: this.data.price
        };
      e.post("order_zs/refund/submit", t, function(t) {
            0 == t.error ? wx.navigateBack() : e.toast(t.message, "loading");
        }, !0);
    },
    change: function(t) {
        var a = {};
        a[e.data(t).name] = t.detail.value, this.setData(a);
    },
    toggle: function(t) {
        var a = e.pdata(t).id;
        a = 0 == a || void 0 === a ? 1 : 0, this.setData({
            code: a
        });
    },
    edit: function(t) {
        this.setData({
            "order.refundstate": 0
        });
    },
    refundcancel: function(t) {
        a.refundcancel(this.data.options.id, function() {
            wx.navigateBack();
        });
    }
});
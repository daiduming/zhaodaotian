var e = getApp(), a = (e.requirejs("icons"), e.requirejs("core"));

e.requirejs("base64"), e.requirejs("wxParse/wxParse");

Page({
    data: {
        route: "home",
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        hotimg: e.globalData.approot + "plugin/app/static/images/wxapp/hotdot.jpg",
        saleout1: e.globalData.approot + "plugin/app/static/images/wxapp/saleout-1.png",
        saleout2: "/static/images/saleout-2.png",
        saleout3: "/static/images/saleout-3.png",
        icons: e.requirejs("icons"),
        diypage: ""
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        a.get("diypage&id=1", {}, function(a) {
            var i = {
                loading: !1,
                diypage: a.diypage
            };
            e.setData(i);
        });
    },
    onHide: function() {},
    onUnload: function() {}
});
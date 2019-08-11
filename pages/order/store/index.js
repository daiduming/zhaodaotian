var t = getApp(), e = t.requirejs("core"), i = t.requirejs("jquery");

Page({
    data: {
        search: !1,
        show_distance: !1
    },
    onLoad: function(e) {
        this.setData({
            options: e
        }), t.url(e), this.get_list();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    get_list: function() {
        var t = this, i = {
            ids: t.data.options.ids,
            type: t.data.options.type,
            merchid: t.data.options.merchid
        };
        wx.getLocation({
            type: "wgs84",
            success: function(s) {
                i.lat = s.latitude, i.lng = s.longitude, t.setData({
                    show_distance: !0
                }), e.get("store/selector", i, function(e) {
                    t.setData({
                        list: e.list,
                        show: !0
                    });
                });
            },
            fail: function(s) {
                setTimeout(function() {
                    e.toast("位置获取失败");
                }, 1e3), e.get("store/selector", i, function(e) {
                    t.setData({
                        list: e.list,
                        show: !0
                    });
                });
            }
        });
    },
    bindSearch: function(t) {
        this.setData({
            search: !0
        });
    },
    phone: function(t) {
        e.phone(t);
    },
    select: function(i) {
        var s = e.pdata(i).index;
        t.setCache("orderShop", this.data.list[s], 30), wx.navigateBack();
    },
    search: function(t) {
        var e = t.detail.value, s = this.data.old_list, a = this.data.list, n = [];
        i.isEmptyObject(s) && (s = a), i.isEmptyObject(s) || i.each(s, function(t, i) {
            -1 != i.storename.indexOf(e) && n.push(i);
        }), this.setData({
            list: n,
            old_list: s
        });
    }
});
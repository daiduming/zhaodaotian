var t = getApp(), e = t.requirejs("core");

Page({
  data: {
    loaded: !1,
    empty: !0,
    page: 1,
    list: [],
    imgUrl: t.globalData.approot,
    status: 1,
    total: 0
  },
  selected: function (t) {
    var e = t.target.dataset.type;
    this.setData({
      list: [],
      page: 1,
      status: e,
      loaded: !0,
      empty: !1
    }), this.getList();
  },
  onLoad: function (e) {
    t.url(e);
  },
  onShow: function () {
    this.getList();
    var e = this, a = t.getCache("isIpx");
    console.error(a), a ? e.setData({
      isIpx: !0,
      iphonexnavbar: "fui-iphonex-navbar",
      paddingb: "padding-b"
    }) : e.setData({
      isIpx: !1,
      iphonexnavbar: "",
      paddingb: ""
    });
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  getList: function () {
    var t = this;
    e.get("travels/my/get_list", { status: t.data.status, page: t.data.page}, function (e) {
      t.setData({
        loaded: !1,
        total: e.total,
        page: t.data.page + 1,
        list: t.data.list.concat(e.list),
        show: !0
      });
      if (e.total == 0) {
        t.setData({
          empty: !0
        });
      }
    });
  },
  deleteItem: function (t) {
    var a = this, i = e.pdata(t).id;
    e.confirm("删除后无法恢复, 确认要删除吗 ?", function () {
      a.setData({
        loaded: !1
      }), e.get("travels/my/delete", {
        id: i
      }, function (t) {
        e.toast("删除成功"), a.getList();
      });
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.loaded || this.getList();
  }
});
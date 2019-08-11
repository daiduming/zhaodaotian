var t = getApp(), core = t.requirejs("core");

Page({
  data: {
    imgUrl: t.globalData.approot,
    id: null,
    posting: !1,
    subtext: "立即发布",
    title: '',
    content: '',
    images: [],
    imgs: [],
    thumb: '',
    address: ''
  },
  onLoad: function (e) {
    console.log(t.url);
    this.setData({
      id: Number(e.id)
    }), t.url(e), this.getDetail(), e.id || wx.setNavigationBarTitle({
      title: "添加游记"
    });
  },
  getDetail: function () {
    var t = this, a = t.data.id;
    core.get("travels/my/get_detail", {
      id: a
    }, function (e) {
      var a = {
        show: !0
      };
      if (e.detail) {
        wx.setNavigationBarTitle({
          title: "编辑游记"
        });
        a.detail = e.detail;
        a.title = e.detail.title;
        a.content = e.detail.content;
        a.imgs = e.detail.imgs;
      }
      t.setData(a);
    });
  },
  submit: function () {
    var i = this;
    var r = {
      id: i.data.id,
      title: i.data.title,
      content: i.data.content,
      images: i.data.imgs,
      thumb: i.data.thumb,
      address: i.data.address
    };
    if(!r.title){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 1000
      });
      return
    }
    if (!r.content) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1000
      });
      return
    }
    core.post("travels/my/submit", r, function (s) {
      if (0 != s.error) return i.setData({
        posting: !1
      }), void core.toast(i, s.message);
      i.setData({
        subtext: "发布成功"
      }), core.toast("发布成功"), wx.navigateBack();
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
  upload: function (t) {
    var e = this, s = core.data(t), i = s.type, o = e.data.images, n = e.data.imgs, r = s.index;
    i = i ? i : t.currentTarget.dataset.type;
    "image" == i ? core.upload(function (t) {
      o.push(t.filename), n.push(t.url), e.setData({
        images: o,
        imgs: n
      });
    }) : "thumb" == i ? core.upload(function (t) {
      e.setData({
        thumb: t.url
      })
    }) : "image-remove" == i ? (o.splice(r, 1), n.splice(r, 1), e.setData({
      images: o,
      imgs: n
    })) : "image-preview" == i && wx.previewImage({
      current: n[r],
      urls: n
    });
  }
});
// pages/travels/details.js
var app = getApp(), core = app.requirejs("core"), wxParse = app.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot,
    yizan: !1,
    total: 0,
    page: 1,
    commentList: []
  },

  dianzan: function(){
    var t = this
    var r = {
      id: t.data.id
    }
    core.post("travels/dianzan", r, function (s) {
      if (0 != s.error){
        wx.showToast({
          title: s.message,
          icon: 'none',
          duration: 1000
        });
        return
      }else{
        t.setData({
          yizan: !t.data.yizan
        })
      }
    })
  },

  getDetail: function () {
    var t = this, a = t.data.id;
    core.get("travels/get_detail", {
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
        a.yizan = e.detail.yizan;
        a.detail = e.detail;
        wxParse.wxParse("wxParseData", "html", a.detail.content, t, "0");
      }
      t.setData(a);
    });
  },

  getCommentList: function () {
    var t = this;
    core.get("travels/getCommentList", { id: t.data.id, page: t.data.page }, function (e) {
      t.setData({
        loaded: !1,
        total: e.total,
        page: t.data.page + 1,
        commentList: t.data.commentList.concat(e.list)
      });
      if (e.list.length == 0) {
        t.setData({
          all: !0
        })
      }
    });
  },
  
  more: function(){
    this.setData({
      loaded: !0
    })
    this.getCommentList();
  },

  onChange: function (t) {
    var e = this;
    var i = t.currentTarget.dataset.type;
    var v = t.detail.value;
    e.setData({
      [i]: v
    });
  },

  submit: function(){
    var i = this;
    var r = {
      id: i.data.id,
      content: i.data.remark
    };
    if (!r.content) {
      wx.showToast({
        title: '请输入您的评论内容',
        icon: 'none',
        duration: 1000
      });
      return
    }
    core.post("travels/submitRemark", r, function (s) {
      if (0 != s.error){
        wx.showToast({
          title: s.message,
          icon: 'none',
          duration: 1000
        })
        return
      }else{
        i.setData({
          page: 1,
          commentList: []
        })
        i.getCommentList();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: Number(options.id)
    }), this.getDetail(), this.getCommentList();
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
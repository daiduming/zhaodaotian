var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot,
    villageList: {},
    index: '',
    memberInfo: {}
  },

  getInfo: function () {
    var that = this;
    core.get("villager", {}, function (res) {
      if (res.member.isvillager==1){
        wx.redirectTo({
          url: '/pages/villager/index'
        })
      }else{
        that.setData({
          show: !0,
          memberInfo: res.member
        })
      }
    });
  },

  getVillage: function () {
    var that = this;
    core.get("villager/getVillage", {}, function (res) {
      that.setData({
        villageList: res.list
      })
    });
  },

  onChange: function (t) {
    var e = this;
    var i = t.currentTarget.dataset.type;
    var v = t.detail.value;
    e.setData({
      [i]: v
    });
  },

  bindPickerChange: function (e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  submit: function () {
    var i = this;
    var r = {
      realname: i.data.realname,
      idnumber: i.data.idnumber,
      mobile: i.data.mobile,
      villageid: i.data.villageList[i.data.index] ? i.data.villageList[i.data.index].id : ''
    };
    console.log(r);
    if (!r.realname) {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none',
        duration: 1000
      });
      return
    }
    if (!r.idnumber) {
      wx.showToast({
        title: '请输入身份证号码',
        icon: 'none',
        duration: 1000
      });
      return
    }
    if (!r.mobile) {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'none',
        duration: 1000
      });
      return
    }
    if (!r.villageid) {
      wx.showToast({
        title: '请选择所属村庄',
        icon: 'none',
        duration: 1000
      });
      return
    }
    core.post("villager/register", r, function (e) {
      console.log(e);
      if (e.errno==0){
        wx.showToast({
          title: '请输入您的姓名',
          icon: 'none',
          duration: 1000
        }), wx.navigateBack();
      }else{
        core.toast(i, s.message)
      }      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo(), this.getVillage();
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
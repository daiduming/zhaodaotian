// pages/activity/create/index.js
var app = getApp(), core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.approot,
    oldprice: 0,
    price: 0,
    total: 1,
    couponList: [],
    couponIndex: ''
  },

  choiceCoupon: function(e){
    var t = this;
    var index = e.currentTarget.dataset.index;
    var coupon = t.data.couponList[index];
    if (index === t.data.couponIndex){
      t.setData({
        couponIndex: '',
        price: t.data.oldprice
      })
    }else{
      t.setData({
        couponIndex: index,
        price: t.data.oldprice - coupon.amount
      })
    }
  },

  getDetail: function () {
    var t = this, a = t.data.id;
    core.get("homestay/get_Yuding", {
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
          title: e.detail.hotel_name
        });
        a.detail = e.detail;
        a.oldprice = e.detail.price * t.data.num;
        a.price = e.detail.price * t.data.num;
        if (e.member){
          a.member = e.member;
          a.realname = e.member.realname;
          a.mobile = e.member.mobile;
        }
      }
      t.setData(a), t.getCoupon();
    });
  },
  getCoupon: function(){
    var t = this;
    core.get("homestay/couponList", {}, function (e) {
      var a = {};
      a.couponList = e.list;
      t.setData(a);
    });
  },
  minus: function(){
    var total = this.data.total - 1
    total = total < 1 ? 1 : total
    var price = this.data.detail.price * this.data.num * total
    if (this.data.couponIndex !== '') {
      price = price - this.data.couponList[this.data.couponIndex].amount
    }
    this.setData({
      total: total,
      price: price,
      oldprice: this.data.detail.price * this.data.num * total
    })
  },
  changeTotal: function (e) {
    var t = this;
    var v = e.detail.value;
    v = v < 1 ? 1 : Number(v)
    var price = this.data.detail.price * this.data.num * v;
    if (t.data.couponIndex !== '') {
      price = price - t.data.couponList[t.data.couponIndex].amount
    }
    t.setData({
      total: v,
      price: price,
      oldprice: this.data.detail.price * this.data.num * v
    });
  },
  plus: function () {
   var total = this.data.total + 1
    var price = this.data.detail.price * this.data.num * total
    if (this.data.couponIndex !== '') {
      price = price - this.data.couponList[this.data.couponIndex].amount
    }
    this.setData({
      total: total,
      price: price,
      oldprice: this.data.detail.price * this.data.num * total
    })
  },
  submit: function () {
    var i = this;
    var r = {
      id: i.data.id,
      realname: i.data.realname,
      mobile: i.data.mobile,
      remark: i.data.remark,
      starttime: i.data.start,
      endtime: i.data.end,
      total: i.data.total,
      num: i.data.num,
      price: i.data.price
    };
    if (i.data.couponIndex!==''){
      r.couponid = i.data.couponList[i.data.couponIndex].id
    }
    if (!r.realname || !r.mobile) {
      wx.showToast({
        title: '姓名和手机号不能为空',
        icon: 'none',
        duration: 1000
      });
      return
    }
    core.post("homestay/create", r, function (s) {
      if (0 != s.error){
        wx.showToast({
          title: s.message,
          icon: 'none',
          duration: 1000
        });
        return
      }else{ 
        wx.redirectTo({
          url: "/pages/homestay/pay/index?id=" + s.orderid
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
    if (options.start){
      this.setData({
        start: options.start
      })
    }
    if (options.end) {
      this.setData({
        end: options.end
      })
    }
    if (this.data.start && this.data.end) {
      this.dateDiff(this.data.start, this.data.end);
    }
    this.setData({
      id: Number(options.id)
    }), this.getDetail();
  },

  dateDiff: function (sDate1, sDate2) {
    var aDate, oDate1, oDate2, iDays, startDate, endDate;
    aDate = sDate1.split("")
    oDate1 = new Date(aDate[4] + aDate[5] + '-' + aDate[6] + aDate[7] + '-' + aDate[0] + aDate[1] + aDate[2] + aDate[3])    //转换为12-18-2006格式
    startDate = aDate[4] + aDate[5] + '月' + aDate[6] + aDate[7] + '日';
    aDate = sDate2.split("")
    oDate2 = new Date(aDate[4] + aDate[5] + '-' + aDate[6] + aDate[7] + '-' + aDate[0] + aDate[1] + aDate[2] + aDate[3])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
    endDate = aDate[4] + aDate[5] + '月' + aDate[6] + aDate[7] + '日';
    this.setData({
      num: iDays,
      startDate: startDate,
      endDate: endDate
    })
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
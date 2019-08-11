// pages/homestay/index.js
var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    imgUrl: t.globalData.approot,
    list: [],
    isrecommend: !1,
    ishot:!1,
    isnew: !1,
    region: ['省', '市', '区'],
    customItem: '全部',
    array: [],
    index: 0
  },
  formSubmit: function (e) {
    this.setData({
      keyword: e.detail.value.keyword,
      list: [],
      page: 1
    })
    this.getList();
  },
  bindRegionChange: function (e) {
    var area = e.detail.value[2];
    this.setData({
      region: e.detail.value,
      list: [],
      page: 1
    })
    if (area != '区' && area != '全部'){
      this.getvillage();
    }
    this.getList();
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      list: [],
      page: 1
    })
    this.getList();
  },

  getvillage: function () {
    var t = this;
    a.get("homestay/get_villageList", {
      province: t.data.region[0],
      city: t.data.region[1],
      area: t.data.region[2]
    }, function (e) {
      if (e.list) {
        t.setData({
          array: e.list
        })
      }
    });
  },

  getList: function () {
    var t = this;
    var data = {
      page: t.data.page,
      keyword: t.data.keyword,
      lat: t.data.mypos.lat,
      lng: t.data.mypos.lng
    }
    if (t.data.isrecommend){
      data.isrecommend = t.data.isrecommend;
    }
    if (t.data.ishot) {
      data.ishot = t.data.ishot;
    }
    if (t.data.isnew) {
      data.isnew = t.data.isnew;
    }
    if (t.data.keyword) {
      data.keyword = t.data.keyword;
    }
    if (t.data.region[0] != '省' && t.data.region[0] != '全部') {
      data.province = t.data.region[0];
    }
    if (t.data.region[1] != '市' && t.data.region[1] != '全部') {
      data.city = t.data.region[1];
    }
    if (t.data.region[2] != '区' && t.data.region[2] != '全部') {
      data.area = t.data.region[2];
    }
    if (t.data.index>0) {
      data.villageid = t.data.array[t.data.index].id;
    }
    if (t.data.id) {
      data.villageid = t.data.id;
    }
    a.get("homestay/get_list", data, function (e) {
      var i = {
        show: !0,
        loaded: !1,
        total: e.total,
        pagesize: e.pagesize
      };
      e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list)), t.setData(i);
      if (e.list.length == 0 && t.data.page>1){
        t.setData({
          nomore: !0
        }),setInterval(function () {
          t.setData({
            nomore: !1
          })
          }, 2000); 
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var i = this;
    if (e.isnew){
      wx.setNavigationBarTitle({
        title: '新宿首发'
      });
      i.setData({
        isnew: e.isnew
      })
    }
    if (e.isrecommend) {
      i.setData({
        isrecommend: e.isrecommend
      })
    }
    if (e.ishot) {
      i.setData({
        ishot: e.ishot
      })
    }
    if(e.id){
      i.setData({
        id: e.id
      })
    }
    var s = t.getCache("mypos");
    s ? (i.setData({
      mypos: s
    }), i.getList()) : wx.getLocation({
      type: "wgs84",
      success: function (a) {
        t.setCache("mypos", {
          lat: a.latitude,
          lng: a.longitude,
          speed: a.speed,
          accuracy: a.accuracy
        }, 7200), i.setData({
          mypos: {
            lat: a.latitude,
            lng: a.longitude,
            speed: a.speed,
            accuracy: a.accuracy
          }
        }), i.getList()
      },
      fail: function (t) {
        a.alert("取消位置信息将无法定位到民宿距离！"), i.setData({
          mypos: {
            lat: "",
            lng: ""
          }
        }), i.getList()
      }
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
    this.data.loaded || (this.setData({loaded: !0}),this.getList())
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
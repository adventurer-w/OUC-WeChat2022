Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['山东省','青岛市','崂山区'],
    now:{
      cloud: "0",
      dew: "0",
      feelsLike: "0",
      humidity: "0",
      icon: "999",
      obsTime: "2022-08-17T17:56+08:00",
      precip: "0.0",
      pressure: "0",
      temp: "0",
      text: "多云",
      vis: "0",
      wind360: "0",
      windDir: "未知",
      windScale: "0",
      windSpeed: "0",
    },
    pic:'s1_bw'
  },

  // 更新地区
  regionChange:function(e){
    this.setData({region:e.detail.value})
    // this.getWeather()
    this.getWeather()
  },

  showimg(){
    console.log(this.data.pic)
    if(this.data.pic=='s1_bw') this.setData({pic:'s1_color'})
    else if(this.data.pic=='s1_color') this.setData({pic:'s2'})
    else this.setData({pic:'s1_bw'})
  },

// 获取天气
  getWeather: function(){
    var that = this;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data:{
        location:that.data.region[2],
        key:'b90d492124f74bf0a2e2eb1a88cdfc66'
      },
      success:function(res){
        console.log(res.data);
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now',
          data:{
            location:res.data.location[0].id,
            key:'b90d492124f74bf0a2e2eb1a88cdfc66'
          },
          // 成功！
          success:function(ress){
            console.log(ress.data);
            that.setData({now:ress.data.now})
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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
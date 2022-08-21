// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:0,
    nickName:"未登录",
    src:"/images/index1.png",
    newsList: []
  },
  // 获取个人信息
  getMyInfo:function(){
    console.log('0'),
    wx.getUserProfile({
      desc: '展示用户信息', 
      success: (res) => {
        console.log(res)
        this.setData({
          src:res.userInfo.avatarUrl,
          nickName:res.userInfo.nickName,
          isLogin:true
        })
      }
    })
    //获取新闻列表
    this.getMyFavorites()
  },
  //更新number
  getMyFavorites:function(){
    let info = wx.getStorageInfoSync()  //读取本地缓存信息
    let keys = info.keys    //获取全部key信息 
    let num = keys.length   //获取收藏新闻数量
    
    let myList = [];
    for( var i = 0; i < num; i++ ){
      let obj = wx.getStorageSync(keys[i])
      myList.push(obj)
    }
    //更新收藏列表
    this.setData({
      newsList:myList,
      number:num
    })
  },
  goToDetail: function (e) {
    //获取携带data-id的数据
    let id = e.currentTarget.dataset.id
    //console.log(e)
    //携带新闻ID进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if( this.data.isLogin ){
      this.getMyFavorites()
    }
  },
})
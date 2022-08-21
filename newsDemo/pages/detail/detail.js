// pages/detail/detail.js
var common = require('../../utils/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      id: '239875',
      title: '记者手记：国家庆典，每个人都是记录者',
      poster: 'http://i2.chinanews.com/simg/cmshd/2019/10/01/c5391220f28d49bdbd14c58a4300bde0.jpg',
      add_date: '2019 - 10 - 01',
      content: '    10月1日凌晨3时，大批中外记者先后乘坐巴士，向天安门方向出发。仍处于夜幕中的北京，多数市民正在享受难得的假期时光。此刻长安街上的安静，将与7个小时后形成巨大反差。'

    },
    isAdd:false
  },
  //添加收藏
  addFavorites:function(){
    let article = this.data.article
    wx.setStorageSync(article.id, article)
    this.setData({
      isAdd:true
    })
  },
  //取消收藏
  cancelFavorites:function(){
    let article = this.data.article
    wx.removeStorageSync(article.id)
    this.setData({
      isAdd:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    console.log(id)
    //检查当前新闻是否在收藏夹中
    var newarticle = wx.getStorageSync(id)
    //已存在
    if( newarticle != '' ){
      this.setData({
        isAdd:true,
        article:newarticle
      })
    }
    //不存在
    else{
      let result = common.getNewsDetail(id)
      //获取新闻内容
      if( result.code == '200' ){
        this.setData({
          article:result.news,
          isAdd:false
        })
      }
    }
    
    },
})